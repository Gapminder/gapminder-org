import {Component, Inject} from '@angular/core';
import {OnActivate, ComponentInstruction, Router, RouterLink, CanReuse} from '@angular/router-deprecated';
import {NodePageContent} from '../../structures/content-type.structures';
import {ContenfulContent} from '../../services/contentful-content.service';
import {ToDatePipe} from '../../pipes/to-date.pipe';
import {EntriesViewComponent} from '../entries-view/entries-view.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {LineSocialComponent} from '../line-social/line-social.component';
import {ContentfulNodePage} from '../../structures/aliases.structures';
import {RoutesGatewayService} from '../../services/routes-gateway.service';
import {appInjector} from '../../tools/app-injector.tool';
import {Angulartics2On} from 'angulartics2/index';
import {TagsComponent} from '../tags/list-tags.component';
import {BreadcrumbsService} from '../breadcrumbs/breadcrumbs.service';

@Component({
  template: require('./dynamic-content-details.component.html') as string,
  directives: [EntriesViewComponent, SidebarComponent, LineSocialComponent, RouterLink, Angulartics2On, TagsComponent],
  styles: [require('./dynamic-content-details.component.styl') as string],
  pipes: [ToDatePipe]
})
export class DynamicContentDetailsComponent implements OnActivate, CanReuse {
  private content: NodePageContent;
  private childrenList: ContentfulNodePage[];
  private routesGatewayService: RoutesGatewayService;
  private urlPath: string;
  private contentSlug: string;
  private router: Router;
  private contentfulContentService: ContenfulContent;
  private breadcrumbsService: BreadcrumbsService;

  public constructor(@Inject(Router) router: Router,
                     @Inject(ContenfulContent) contentfulContentService: ContenfulContent,
                     @Inject(BreadcrumbsService) breadcrumbsService: BreadcrumbsService) {
    this.router = router;
    this.contentfulContentService = contentfulContentService;
    this.breadcrumbsService = breadcrumbsService;

    // FIXME: Workaround for now - should be injected in a proper way not using the injector explicitly
    this.routesGatewayService = appInjector().get(RoutesGatewayService);
  }

  public routerOnActivate(next: ComponentInstruction): any {
    this.urlPath = next.urlPath;
    this.contentSlug = next.urlPath.split('/').pop();
    this.contentfulContentService
      .getNodePage(this.contentSlug)
      .subscribe(
        (content: ContentfulNodePage[]) => {
          if (!content) {
            this.router.navigate(['Root']);
          }
          this.content = content[0].fields;
          this.breadcrumbsService.breadcrumbs$.next({url: next.urlPath, name: this.content.title});
          this.contentfulContentService
            .getChildrenOf(content[0].sys.id)
            .subscribe(
              (children: ContentfulNodePage[]) => {
                this.childrenList = children;
                for (let item of children) {
                  if (item.fields) {
                    this.routesGatewayService.addRoute(`${this.urlPath}/${item.fields.slug}`, {name: item.fields.title});
                  }
                }
              });
        });
  }

  // noinspection TsLint
  public routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction): boolean {
    return false;
  }
}

