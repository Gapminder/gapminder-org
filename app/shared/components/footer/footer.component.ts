import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {AsyncPipe} from '@angular/common';
import {ContenfulContent, RoutesGatewayService, Menu, ContentfulMenu, FooterMenuComponent} from 'ng2-contentful-blog';
import {Angulartics2On} from 'angulartics2/index';

@Component({
  selector: 'gm-footer',
  encapsulation: ViewEncapsulation.None,
  template: require('./footer.html') as string,
  directives: [RouterLink, Angulartics2On, FooterMenuComponent],
  styles: [require('./footer.styl') as string],
  pipes: [AsyncPipe]
})
export class FooterComponent implements OnInit {
  private menuType: string = 'footerMenu';
  private menu: Menu[];
  private contentfulContentService: ContenfulContent;
  private routesGatewayService: RoutesGatewayService;

  public constructor(@Inject(ContenfulContent) contentfulContentService: ContenfulContent,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService) {
    this.contentfulContentService = contentfulContentService;
    this.routesGatewayService = routesGatewayService;
  }

  public ngOnInit(): void {
    this.contentfulContentService
      .getMenu(this.menuType)
      .subscribe((response: ContentfulMenu[]) => {
        this.menu = response[0].fields.entries;
        for (let item of this.menu) {
          if (item.fields.entryPoint) {
            this.routesGatewayService.addRoute(item.fields.entryPoint.fields.slug, {name: item.fields.entryPoint.fields.title});
          }
        }
      });
  }
}
