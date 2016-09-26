import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { ContenfulContent } from 'ng2-contentful-blog/components/contentful/contentful-content.service';
import { RoutesManagerService } from 'ng2-contentful-blog/components/routes-gateway/routes-manager.service';
import { ContentfulNodePage, ContentfulImage } from 'ng2-contentful-blog/components/contentful/aliases.structures';
import * as _ from 'lodash';

@Component({
  selector: 'gm-gapminder-overview',
  encapsulation: ViewEncapsulation.None,
  template: require('./gapminder-overview.html') as string,
  styles: [require('./gapminder-overview.styl') as string]
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
      .mergeMap((slides: ContentfulNodePage[]) => this.contentfulContentService.getArticleWithFullUrlPopulated(slides))
      .subscribe((slides: ContentfulNodePage[]) => {
        this.routesManager.addRoutesFromArticles(... slides);
        this.slides = slides;
      });
  }
}
interface CarouselConfig {
  head: string;
  interval: number;
  noWrap: boolean;
}
