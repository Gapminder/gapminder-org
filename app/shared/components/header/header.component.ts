import { Component, OnInit, Inject } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CollapseDirective, DROPDOWN_DIRECTIVES } from 'ng2-bootstrap';
import { SearchComponent } from '../search/search.component';
import { HeaderMenuComponent, BreadcrumbsService, ContenfulContent, ContentfulImage } from 'ng2-contentful-blog';
import * as _ from 'lodash';

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
  private contentfulContentService: ContenfulContent;
  private headerLogo: ContentfulImage;
  private constants: any;

  public constructor(router: Router,
                     contentfulContentService: ContenfulContent,
                     breadcrumbsService: BreadcrumbsService,
                     @Inject('Constants') constants: any) {
    this.router = router;
    this.constants = constants;
    this.contentfulContentService = contentfulContentService;
    this.breadcrumbsService = breadcrumbsService;
  }

  public ngOnInit(): any {
    this.contentfulContentService.getImagesByTitle(this.constants.HEADER_LOGO_TITLE)
      .subscribe((images: ContentfulImage[]) => {
        this.headerLogo = _.first(images);
      });
    this.router.events.subscribe((path: any) => {
      this.isOnRootView = path.url === '/' || path.url === '';
    });
  }

  public toggle(collapsed: boolean): void {
    this.collapsed = collapsed;
  }
}
