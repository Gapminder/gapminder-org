import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, AsyncPipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CAROUSEL_DIRECTIVES } from 'ng2-bootstrap';
import { Angulartics2On } from 'angulartics2/index';
import { RoutesManagerService, ContentfulNodePage, ContenfulContent, ToDatePipe } from 'ng2-contentful-blog';

@Component({
  selector: 'gm-gapminder-overview',
  encapsulation: ViewEncapsulation.None,
  template: require('./gapminder-overview.html') as string,
  directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, Angulartics2On],
  styles: [require('./gapminder-overview.styl') as string],
  pipes: [AsyncPipe, ToDatePipe]
})

export class GapminderOverviewComponent implements OnInit {
  private slides: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private routesManager: RoutesManagerService;

  /* tslint:disable:no-unused-variable */
  private carouselConfig: CarouselConfig = {
    head: 'A Fact-Based Worldview',
    interval: 5000,
    noWrap: false
  };
  /* tslint:enable:no-unused-variable */

  public constructor(contentfulContentService: ContenfulContent,
                     routesManager: RoutesManagerService) {
    this.contentfulContentService = contentfulContentService;
    this.routesManager = routesManager;

  }

  public ngOnInit(): void {
    this.contentfulContentService.getOverviewPages()
      .subscribe((slides: ContentfulNodePage[]) => {
        for (let slide of slides) {
          this.contentfulContentService.getArticleParentSlug(slide.sys.id, (url: string) => {
            slide.fields.url = this.routesManager.addRoute(url, {name: slide.fields.title});
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
