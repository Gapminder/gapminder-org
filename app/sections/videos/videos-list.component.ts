import {Component, OnInit, Injector} from 'angular2/core';
import {RouteData, ROUTER_DIRECTIVES} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful';
import {AsyncPipe} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../shared/services/contentful-content.service';
import {Sidebar} from '../../shared/components/sidebar/sidebar.component.ts';
import {ToDate} from '../../shared/pipes/to-date.pipe';

@Component({
  template: <string> require('./videos-list.component.html'),
  providers: [ContentfulService],
  styles: [<string> require('./videos-list.component.styl')],
  directives: [...ROUTER_DIRECTIVES, Sidebar],
  pipes: [AsyncPipe, ToDate]
})
export class VideosList implements OnInit {
  private contentId: string;
  private videos: Observable<any[]>;

  constructor(private _contentfulContent: ContenfulContent,
              _injector: Injector) {
    let routeData = _injector.parent.parent.get(RouteData);
    this.contentId = routeData.get('contentId');
  }

  ngOnInit(): any {
    this.videos = this._contentfulContent.getNodePagesByType(this.contentId);
    return undefined;
  }
}
