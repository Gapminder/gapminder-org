import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, AsyncPipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CAROUSEL_DIRECTIVES } from 'ng2-bootstrap';
import {
  RoutesManagerService, ContentfulNodePage, ContenfulContent, ToDatePipe,
  ContentfulImage
} from 'ng2-contentful-blog';
import * as _ from 'lodash';

@Component({
  selector: 'gm-gapminder-overview',
  encapsulation: ViewEncapsulation.None,
  template: require('./gapminder-overview.html') as string,
  directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  styles: [require('./gapminder-overview.styl') as string],
  pipes: [AsyncPipe, ToDatePipe]
})

export class GapminderOverviewComponent implements OnInit {
  private slides: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private routesManager: RoutesManagerService;
  private constants: any;
  private gapminderLogo: ContentfulImage;

  /* tslint:disable:no-unused-variable */
  private carouselConfig: CarouselConfig = {
    head: 'A Fact-Based Worldview',
    interval: 5000,
    noWrap: false
  };
  /* tslint:enable:no-unused-variable */

  public constructor(contentfulContentService: ContenfulContent,
                     routesManager: RoutesManagerService,
                     @Inject('Constants') constants: any) {
    this.contentfulContentService = contentfulContentService;
    this.routesManager = routesManager;
    this.constants = constants;

  }

  public ngOnInit(): void {
    this.contentfulContentService.getImagesByTitle(this.constants.HEADER_LOGO_TITLE)
      .subscribe((images: ContentfulImage[]) => {
        this.gapminderLogo = _.first(images);
      });
    this.contentfulContentService.getOverviewPages()
      .subscribe((slides: ContentfulNodePage[]) => {
        for (let slide of slides) {
          this.contentfulContentService.getArticleParentSlug(slide.sys.id, (url: string) => {
            slide.fields.url = this.routesManager.addRoute({path: url, data: {name: slide.fields.title}});
          });
        }
        this.slides = slides;
        return this.slides;
      });
  }
}
interface CarouselConfig {
  head: string;
  interval: number;
  noWrap: boolean;
}
