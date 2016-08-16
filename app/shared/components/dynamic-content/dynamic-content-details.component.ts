import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, UrlPathWithParams, ROUTER_DIRECTIVES } from '@angular/router';
import {
  BreadcrumbsService,
  ContenfulContent,
  RoutesManagerService,
  TagsComponent,
  EntriesViewComponent,
  NodePageContent,
  ContentfulNodePage,
  ToDatePipe, ContributorsComponent, RelatedComponent, ContentfulTagPage
} from 'ng2-contentful-blog';
import { ContentfulProfilePage } from 'ng2-contentful-blog/components/contentful/aliases.structures';
import { RawRoute } from 'ng2-contentful-blog/components/routes-gateway/routes-manager.service';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'gm-content',
  template: require('./dynamic-content-details.component.html') as string,
  directives: [EntriesViewComponent, ROUTER_DIRECTIVES, RelatedComponent, TagsComponent, ContributorsComponent],
  styles: [require('./dynamic-content-details.component.styl') as string],
  pipes: [ToDatePipe]
})
export class DynamicContentDetailsComponent implements OnInit {
  private content: NodePageContent;
  private children: ContentfulNodePage[];
  private urlPath: string;
  private contentSlug: string;
  private router: Router;
  private activatedRoute: ActivatedRoute;
  private contentfulContentService: ContenfulContent;
  private routesManager: RoutesManagerService;
  private breadcrumbsService: BreadcrumbsService;
  private constants: any;
  private profiles: ContentfulProfilePage[];
  private cssClassBigColumn: boolean = false;
  private cssClassSmallColumn: boolean = false;

  public constructor(router: Router,
                     activatedRoute: ActivatedRoute,
                     routesManager: RoutesManagerService,
                     contentfulContentService: ContenfulContent,
                     @Inject('Constants') constants: any,
                     breadcrumbsService: BreadcrumbsService) {
    this.router = router;
    this.contentfulContentService = contentfulContentService;
    this.breadcrumbsService = breadcrumbsService;
    this.routesManager = routesManager;
    this.constants = constants;
    this.activatedRoute = activatedRoute;
  }

  public ngOnInit(): void {
    this.activatedRoute.url
      .subscribe((urls: UrlPathWithParams[]) => {
        this.urlPath = urls.map((value: UrlPathWithParams) => value.path).join('/');
        this.contentSlug = this.urlPath.split('/').pop();

        this.contentfulContentService
          .getTagsBySlug(this.constants.PROJECT_TAG)
          .mergeMap((tags: ContentfulTagPage[]) => Observable.from(tags))
          .map((tag: ContentfulTagPage) => tag.sys.id)
          .mergeMap((tagSysId: string) => this.contentfulContentService.getArticleByTagAndSlug(tagSysId, this.contentSlug))
          .mergeMap((articles: ContentfulNodePage[]) => Observable.from(articles))
          .filter((article: ContentfulNodePage) => !!_.find(article.fields.tags, (tag: ContentfulTagPage) => tag.fields.slug === this.constants.PROJECT_TAG))
          .subscribe((article: ContentfulNodePage) => this.onArticleReceived(article));
      });
  }

  private onArticleReceived(article: ContentfulNodePage): void {
    if (!article) {
      this.router.navigate(['/']);
    }

    this.content = article.fields;
    this.breadcrumbsService.breadcrumbs$.next({url: this.urlPath, name: this.content.title});

    this.contentfulContentService
      .gerProfilesByArticleId(article.sys.id)
      .subscribe((profiles: ContentfulProfilePage[]) => {
        this.profiles = profiles;
        if (this.content.relatedLocation && this.content.related || _.isEmpty(profiles) && !this.content.related) {
          this.cssClassBigColumn = true;
        }
        if (!this.content.relatedLocation && this.content.related || !_.isEmpty(profiles)) {
          this.cssClassSmallColumn = true;
        }
      });

    this.contentfulContentService.getChildrenOfArticleByTag(article.sys.id, this.constants.PROJECT_TAG)
      .do((articles: ContentfulNodePage[]) => this.addRoutes(articles))
      .subscribe((children: ContentfulNodePage[]) => {
        this.children = children;

      });
  }

  private addRoutes(articles: ContentfulNodePage[]): void {
    const rawRoutes: RawRoute[] = [];
    _.forEach(articles, (contentfulArticle: ContentfulNodePage) => {
      const article: NodePageContent = contentfulArticle.fields;
      rawRoutes.push({path: article.slug, data: {name: article.title}});
    });
    this.routesManager.addRoutes(rawRoutes);
  }
}

