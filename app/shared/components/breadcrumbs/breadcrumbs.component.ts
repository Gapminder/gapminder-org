import {Component, OnInit, Inject} from '@angular/core';
import {RouterLink, Router, RouteDefinition, Instruction} from '@angular/router-deprecated';
import {RootComponent} from '../../../sections/root/root.component';
import {RoutesGatewayService} from '../../services/routes-gateway.service';
import {AppComponent} from '../../../app.component';
import {BreadcrumbsService} from './breadcrumbs.service';
import {Angulartics2On} from 'angulartics2/index';

@Component({
  selector: 'gm-breadcrumbs',
  template: require('./breadcrumbs.html') as string,
  styles: [require('./breadcrumbs.styl') as string],
  directives: [RouterLink, Angulartics2On]
})
export class BreadcrumbsComponent implements OnInit {
  public type: string = 'Breadcrumbs Component';
  private routeDefinition: RouteDefinition[];
  private isOnRootView: boolean;
  private urls: string[] = [];
  private router: Router;
  private routesGatewayService: RoutesGatewayService;
  private breadcrumbsService: BreadcrumbsService;
  private breadcrumbFragmentName: string;

  public constructor(@Inject(Router) router: Router,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService,
                     @Inject(BreadcrumbsService) breadcrumbsService: BreadcrumbsService) {
    this.router = router;
    this.routesGatewayService = routesGatewayService;
    this.routeDefinition = this.routesGatewayService.getRouteDefinitions(AppComponent);
    this.breadcrumbsService = breadcrumbsService;
  }

  public ngOnInit(): any {
    this.breadcrumbsService.breadcrumbs$.subscribe((res: any)=> {
      this.router.recognize(res.url).then((instruction: Instruction) => {
        this.urls = [];
        this.breadcrumbFragmentName = res.name;
        this.generateBreadcrumbTrail(res.url);
        this.isOnRootView = instruction.component.componentType === RootComponent;
      });
    });
  }

  public generateBreadcrumbTrail(url: string): void {
    this.urls.unshift(url);
    if (url.lastIndexOf('/') > 0) {
      this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
    }
  }

  public friendlyName(url: string): string {
    if (this.routeDefinition && url) {
      let route: RouteDefinition;
      for (let item of this.routeDefinition) {
        route = item;
        if (url === route.path) {
          return route.data ? route.data.name : route.path;
        }
      }
    }
    return this.breadcrumbFragmentName;
  }

}
