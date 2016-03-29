import {Component, ViewEncapsulation, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, AsyncPipe} from 'angular2/common';
import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../../../shared/services/contentful-content.service';
import {ContentfulNodePage} from '../../../../shared/structures/aliases.structures';
import {ToDate} from '../../../../shared/pipes/to-date.pipe';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'gapminder-overview',
  encapsulation: ViewEncapsulation.None,
  template: <string> require('./gapminder-overview.html'),
  directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink],
  styles: [
    <string> require('./gapminder-overview.styl')
  ],
  pipes: [AsyncPipe, ToDate]
})

export class GapminderOverviewComponent implements OnInit {
  private slides: Observable<ContentfulNodePage[]>;
  private carouselConfig = {
    head: 'A Fact-Based Worldview',
    interval: 5000,
    noWrap: false
  };

  constructor(private _contentfulContent: ContenfulContent) {
  }

  ngOnInit(): any {
    this.slides = this._contentfulContent.getOverviewPages();
  }
}
