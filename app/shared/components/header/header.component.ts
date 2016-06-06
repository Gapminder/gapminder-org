import {Component, OnInit, Inject} from '@angular/core';
import {RouterLink, Router, Instruction} from '@angular/router-deprecated';
import {CollapseDirective, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {RootComponent} from '../../../sections/root/root.component';
import {SearchComponent} from '../search/search.component';
import {Menu} from '../../structures/content-type.structures';
import {ContenfulContent} from '../../services/contentful-content.service';
import {RoutesGatewayService} from '../../services/routes-gateway.service';
import {Angulartics2On} from 'angulartics2/index';
import {ContentfulMenu} from '../../structures/aliases.structures';

@Component({
  selector: 'gm-header',
  template: require('./header.html') as string,
  styles: [require('./header.styl') as string],
  directives: [CollapseDirective, DROPDOWN_DIRECTIVES, RouterLink, SearchComponent, Angulartics2On]
})
export class HeaderComponent implements OnInit {
  private isOnRootView: boolean;
  private collapsed: boolean = true;
  private menu: Menu[];
  private menuType: string = 'header';
  private contentfulContentService: ContenfulContent;
  private routesGatewayService: RoutesGatewayService;

  public constructor(@Inject(Router) router: Router,
                     @Inject(ContenfulContent) contentfulContentService: ContenfulContent,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService) {

    this.contentfulContentService = contentfulContentService;
    this.routesGatewayService = routesGatewayService;

    router.subscribe((url: string) => {
      router.recognize(url).then((instruction: Instruction) => {
        this.isOnRootView = instruction.component.componentType === RootComponent;
      });
    });
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
          if (item.fields.submenus) {

            for (let submenu of item.fields.submenus) {
              this.routesGatewayService.addRoute(submenu.fields.entryPoint.fields.slug, {name: submenu.fields.entryPoint.fields.title});
            }

          }

        }

      });
  }

  public toggle(collapsed: boolean): void {
    this.collapsed = collapsed;
  }
}
