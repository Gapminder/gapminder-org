import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, NavigationStart } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { Angulartics2 } from 'angulartics2/index';
import {
  BreadcrumbsService,
  BreadcrumbsComponent
} from 'ng2-contentful-blog';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'gm-app',
  encapsulation: ViewEncapsulation.None,
  providers: [Angulartics2GoogleAnalytics],
  directives: [HeaderComponent, FooterComponent, ROUTER_DIRECTIVES, BreadcrumbsComponent],
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

export class AppComponent implements OnInit {
  public type: string = 'app component';

  private router: Router;
  private angulartics2: Angulartics2;
  private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics;
  private breadcrumbsService: BreadcrumbsService;

  public constructor(router: Router,
                     angulartics2: Angulartics2,
                     angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
                     breadcrumbsService: BreadcrumbsService) {
    this.angulartics2 = angulartics2;
    this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
    this.breadcrumbsService = breadcrumbsService;
    this.router = router;
  }

  public ngOnInit(): void {
    this.router.events.filter((value: any) => value instanceof NavigationStart && value.url === '/')
      .subscribe((value: NavigationStart) => {
        this.breadcrumbsService.breadcrumbs$.next({url: value.url, name: 'Home', show: false});
        // window.scrollTo(0, 0);
      });
  }
}
