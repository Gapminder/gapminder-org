import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { BreadcrumbsService, ContenfulContent, ContentfulImage } from 'ng2-contentful-blog';

@Component({
  selector: 'gm-header',
  template: require('./header.html') as string,
  styles: [require('./header.styl') as string]
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
