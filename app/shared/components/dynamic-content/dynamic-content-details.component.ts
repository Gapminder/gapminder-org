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
  ToDatePipe,
  ContributorsComponent,
  RelatedComponent,
  ContentfulTagPage
} from 'ng2-contentful-blog';
import { ContentfulProfilePage } from 'ng2-contentful-blog/components/contentful/aliases.structures';
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
        this.cssClassSmallColumn = this.relatedSectionIsAtRight() || !_.isEmpty(profiles);
      });

    this.contentfulContentService.getChildrenOfArticleByTag(article.sys.id, this.constants.PROJECT_TAG)
      .subscribe((children: ContentfulNodePage[]) => {
        _.forEach(children, (child: ContentfulNodePage) => {
          const currentPath: string = _.map(this.activatedRoute.snapshot.url, 'path').join('/');
          child.fields.url = `${currentPath}/${child.fields.slug}`;
        });
        this.routesManager.addRoutesFromArticles(... children);
        this.children = children;
      });
  }

  private relatedSectionIsAtRight(): boolean {
    return Boolean(this.rightRelatedLocation() && this.content.related);
  }

  private rightRelatedLocation(): boolean {
    return !Boolean(this.content.relatedLocation);
  }
}

