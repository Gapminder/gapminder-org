import {Component, Input, OnInit} from '@angular/core';
import {DonateComponent} from './donate/donate.component';
import {RouterLink} from '@angular/router-deprecated';
import {RoutesGatewayService} from '../../services/routes-gateway.service';
import {appInjector} from '../../tools/app-injector.tool';
import {ContenfulContent} from '../../services/contentful-content.service';
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

  // noinspection TsLint
  @Input()
  private contentSlug: string;

  private routesGatewayService: RoutesGatewayService;
  private contentfulContentServise: ContenfulContent;

  public constructor(contentfulContentServise: ContenfulContent) {
    this.contentfulContentServise = contentfulContentServise;

    // FIXME: Workaround for now - should be injected in a proper way not using the injector explicitly
    this.routesGatewayService = appInjector().get(RoutesGatewayService);
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
