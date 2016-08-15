import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CollapseDirective, DROPDOWN_DIRECTIVES } from 'ng2-bootstrap';
import { SearchComponent } from '../search/search.component';
import { HeaderMenuComponent, BreadcrumbsService } from 'ng2-contentful-blog';

@Component({
  selector: 'gm-header',
  template: require('./header.html') as string,
  styles: [require('./header.styl') as string],
  directives: [HeaderMenuComponent, CollapseDirective, DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, SearchComponent]
})
export class HeaderComponent implements OnInit {
  private isOnRootView: boolean;
  private collapsed: boolean = true;
  private router: Router;
  private breadcrumbsService: BreadcrumbsService;

  public constructor(router: Router,
                     breadcrumbsService: BreadcrumbsService) {
    this.router = router;
    this.breadcrumbsService = breadcrumbsService;
  }

  public ngOnInit(): any {
    this.router.events.subscribe((path: any) => {
      this.isOnRootView = path.url === '/' || path.url === '';
    });
  }

  public toggle(collapsed: boolean): void {
    this.collapsed = collapsed;
  }
}
