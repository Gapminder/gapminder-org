import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {RootComponent} from './sections/root/root.component';
import RoutesGatewayComponent from './shared/components/dynamic-content/routes-gateway.component';
import {RoutesGatewayService} from './shared/services/routes-gateway.service';
import {BreadcrumbsComponent} from './shared/components/breadcrumbs/breadcrumbs.component';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
import {Angulartics2} from 'angulartics2/index';
import {TagComponent} from './shared/components/tags/tag.component';
import {BreadcrumbsService} from './shared/components/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'gm-app',
  encapsulation: ViewEncapsulation.None,
  providers: [Angulartics2GoogleAnalytics],
  directives: [HeaderComponent, FooterComponent, ...ROUTER_DIRECTIVES, BreadcrumbsComponent],
  styles: [
    require('./main.styl') as string,
    require('./fonts.styl') as string,
    require('./variables.styl') as string
  ],
  template: `
  <div class='page-wrap'>
    <gm-header></gm-header>
     <div class='container'>
      <gm-breadcrumbs></gm-breadcrumbs>
        <router-outlet></router-outlet>
     </div>
  </div>   
  <gm-footer id='footer'></gm-footer>
  `
})
@RouteConfig([
  {path: '/', component: RootComponent, name: 'Root', useAsDefault: true},
  {path: '/tag/:tag', component: TagComponent, name: 'TagComponent'},
  {path: '/**', component: RoutesGatewayComponent}
])
export class AppComponent implements OnInit {
  public type: string = 'app component';

  private router: Router;
  private routesGatewayService: RoutesGatewayService;
  private angulartics2: Angulartics2;
  private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics;
  private breadcrumbsService: BreadcrumbsService;

  public constructor(@Inject(Router) router: Router,
                     @Inject(Angulartics2) angulartics2: Angulartics2,
                     @Inject(Angulartics2GoogleAnalytics) angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService,
                     @Inject(BreadcrumbsService) breadcrumbsService: BreadcrumbsService) {
    this.router = router;
    this.routesGatewayService = routesGatewayService;
    this.angulartics2 = angulartics2;
    this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
    this.breadcrumbsService = breadcrumbsService;
  }

  public ngOnInit(): void {
    this.routesGatewayService.setConstructorOfRouterComponentInstance(this.constructor);

    this.router.subscribe(() => {
      this.breadcrumbsService.breadcrumbs$.next({url: '/', name: 'Home'});
      window.scrollTo(0, 0);
    });
  }
}
