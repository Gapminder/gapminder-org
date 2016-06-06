import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, AsyncPipe} from '@angular/common';
import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../../../shared/services/contentful-content.service';
import {ContentfulNodePage} from '../../../../shared/structures/aliases.structures';
import {ToDatePipe} from '../../../../shared/pipes/to-date.pipe';
import {RouterLink} from '@angular/router-deprecated';
import {RoutesGatewayService} from '../../../../shared/services/routes-gateway.service';
import {Angulartics2On} from 'angulartics2/index';

@Component({
  selector: 'gm-gapminder-overview',
  encapsulation: ViewEncapsulation.None,
  template: require('./gapminder-overview.html') as string,
  directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink, Angulartics2On],
  styles: [require('./gapminder-overview.styl') as string],
  pipes: [AsyncPipe, ToDatePipe]
})

export class GapminderOverviewComponent implements OnInit {
  private slides: ContentfulNodePage[];
  private contentfulContentService: ContenfulContent;
  private routesGatewayService: RoutesGatewayService;

  // noinspection TsLint
  private carouselConfig: CarouselConfig = {
    head: 'A Fact-Based Worldview',
    interval: 5000,
    noWrap: false
  };

  public constructor(@Inject(ContenfulContent) contentfulContentService: ContenfulContent,
                     @Inject(RoutesGatewayService) routesGatewayService: RoutesGatewayService) {
    this.contentfulContentService = contentfulContentService;
    this.routesGatewayService = routesGatewayService;

  }

  public ngOnInit(): void {
    this.contentfulContentService.getOverviewPages()
      .subscribe((slides: ContentfulNodePage[]) => {
        for (let slide of slides) {
          this.routesGatewayService.getSlugParent(slide.sys.id, (url: string) => {
            slide.fields.url = this.routesGatewayService.addRoute(url, {name: slide.fields.title});
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
