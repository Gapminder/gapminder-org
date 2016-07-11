import {Component, Input, OnInit, Inject} from '@angular/core';
import {DonateComponent} from './donate/donate.component';
import {RouterLink} from '@angular/router-deprecated';
import {ContenfulContent, RoutesGatewayService} from 'ng2-contentful-blog';
import {Angulartics2On} from 'angulartics2/index';

@Component({
  selector: 'gm-sidebar',
  template: require('./sidebar.html') as string,
  styles: [require('./sidebar.styl') as string],
  directives: [DonateComponent, RouterLink, Angulartics2On]
})
export class SidebarComponent implements OnInit {
  @Input()
  private relatedItems: Array<any> = [];

  /* tslint:disable:no-unused-variable */
  @Input() private contentSlug: string;
  /* tslint:enable:no-unused-variable */

  private routesGatewayService: RoutesGatewayService;
  private contentfulContentServise: ContenfulContent;

  public constructor(@Inject(ContenfulContent) contentfulContentServise: ContenfulContent,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService) {
    this.contentfulContentServise = contentfulContentServise;
    this.routesGatewayService = routesGatewayService;
  }

  public ngOnInit(): void {
    if (this.relatedItems) {
      for (let item of this.relatedItems) {
        this.routesGatewayService.getSlugParent(item.sys.id, (url: string) => {
          item.fields.url = this.routesGatewayService.addRoute(url, {name: item.fields.title});
        });
      }
    }
  }
}
