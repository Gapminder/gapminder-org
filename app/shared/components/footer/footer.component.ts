import {Component, OnInit, Inject} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {ContenfulContent} from '../../services/contentful-content.service';
import {AsyncPipe} from '@angular/common';
import {Menu} from '../../structures/content-type.structures';
import {RoutesGatewayService} from '../../services/routes-gateway.service';
import {Angulartics2On} from 'angulartics2/index';
import {ContentfulMenu} from '../../structures/aliases.structures';

@Component({
  selector: 'gm-footer',
  template: require('./footer.html') as string,
  directives: [RouterLink, Angulartics2On],
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
