import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NavigationStart, Router } from '@angular/router';
import { BreadcrumbsService } from 'ng2-contentful-blog/components/breadcrumbs/breadcrumbs.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'gm-app',
  encapsulation: ViewEncapsulation.None,
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
  private breadcrumbsService: BreadcrumbsService;
  private showShareLine: boolean;

  @HostListener('window:scroll', ['$event'])
  public onScroll(): any {
    const pageYOffset: number = this.getPageYOffset();
    const pageHasScrollToBottom: boolean = pageYOffset >= 50;
    this.showShareLine = pageHasScrollToBottom;
  }

  public constructor(router: Router,
                     breadcrumbsService: BreadcrumbsService) {
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
