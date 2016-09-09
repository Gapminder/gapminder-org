import {
  Component, ViewEncapsulation, OnInit, HostListener
} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, NavigationStart } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { SubscribeComponent } from './shared/components/subscribe/subscribe.component';
import { Angulartics2 } from 'angulartics2/index';
import {
  BreadcrumbsService,
  BreadcrumbsComponent, ShareFooterLineComponent, FooterComponent, CoverImageComponent
} from 'ng2-contentful-blog';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'gm-app',
  encapsulation: ViewEncapsulation.None,
  providers: [Angulartics2GoogleAnalytics],
  directives: [HeaderComponent, FooterComponent, CoverImageComponent, ShareFooterLineComponent, SubscribeComponent, ROUTER_DIRECTIVES, BreadcrumbsComponent],
  styles: [
    require('./main.styl') as string,
    require('./fonts.styl') as string,
    require('./variables.styl') as string
  ],
  template: `
  <div class='page-wrap'>
    <gm-header id="goTo"></gm-header>
    <gm-cover></gm-cover>
     <div class='container'>
      <gm-breadcrumbs></gm-breadcrumbs>
      <router-outlet></router-outlet>
     </div>
  </div>   
  <gm-subscribe></gm-subscribe>
  <gm-footer></gm-footer>
  <gm-share-line-footer [hidden]="!showShareLine"></gm-share-line-footer>
  `
})

export class AppComponent implements OnInit {
  public type: string = 'app component';
  private router: Router;
  private angulartics2: Angulartics2;
  private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics;
  private breadcrumbsService: BreadcrumbsService;
  private showShareLine: boolean;

  @HostListener('window:scroll', ['$event'])
  public onScroll(): any {
    const pageYOffset: number = this.getPageYOffset();
    const pageHasScrollToBottom: boolean = pageYOffset >= 50;
    this.showShareLine = pageHasScrollToBottom;
  }

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
      });
  }

  private  getPageYOffset(): number {
    return typeof window !== 'undefined' ? window.pageYOffset : 0;
  }
}
