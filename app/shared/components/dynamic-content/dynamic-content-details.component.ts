import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlPathWithParams, ROUTER_DIRECTIVES } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LineSocialComponent } from '../line-social/line-social.component';
import { Angulartics2On } from 'angulartics2/index';
import {
  BreadcrumbsService,
  ContenfulContent,
  RoutesManagerService,
  TagsComponent,
  EntriesViewComponent,
  NodePageContent,
  ContentfulNodePage,
  ToDatePipe, ContributorsComponent
} from 'ng2-contentful-blog';

@Component({
  template: require('./dynamic-content-details.component.html') as string,
  directives: [EntriesViewComponent, SidebarComponent, LineSocialComponent, ROUTER_DIRECTIVES, Angulartics2On, TagsComponent, ContributorsComponent],
  styles: [require('./dynamic-content-details.component.styl') as string],
  pipes: [ToDatePipe]
})
export class DynamicContentDetailsComponent implements OnInit {
  private content: NodePageContent;
  private childrenList: ContentfulNodePage[];
  private urlPath: string;
  private contentSlug: string;
  private articleSysId: string;
  private router: Router;
  private activatedRoute: ActivatedRoute;
  private contentfulContentService: ContenfulContent;
  private routesManager: RoutesManagerService;
  private breadcrumbsService: BreadcrumbsService;

  public constructor(router: Router,
                     activatedRoute: ActivatedRoute,
                     routesManager: RoutesManagerService,
                     contentfulContentService: ContenfulContent,
                     breadcrumbsService: BreadcrumbsService) {
    this.router = router;
    this.contentfulContentService = contentfulContentService;
    this.breadcrumbsService = breadcrumbsService;
    this.routesManager = routesManager;
    this.activatedRoute = activatedRoute;
  }
  public ngOnInit(): void {
    this.activatedRoute.url
      .subscribe((urls: UrlPathWithParams[]) => {
        const url: string = urls.map((value: UrlPathWithParams) => value.path).join('/');
        this.urlPath = url;
        this.contentSlug = url.split('/').pop();
        this.contentfulContentService.getNodePage(this.contentSlug)
          .subscribe((content: ContentfulNodePage[]) => {
            if (!content) {
              this.router.navigate(['/']);
            }
            this.articleSysId = content[0].sys.id;
            this.content = content[0].fields;
            this.breadcrumbsService.breadcrumbs$.next({url: url, name: this.content.title});
            this.contentfulContentService.getChildrenOfArticle(content[0].sys.id)
              .subscribe((children: ContentfulNodePage[]) => {
                this.childrenList = children;
                for (let item of children) {
                  if (item.fields) {
                    this.routesManager.addRoute(`${this.urlPath}/${item.fields.slug}`, {name: item.fields.title});
                  }
                }
              });
          });
      });
  }
}

