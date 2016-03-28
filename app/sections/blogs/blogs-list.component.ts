import {Component, OnInit, Injector} from 'angular2/core';
import {RouteData, ROUTER_DIRECTIVES} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful';
import {AsyncPipe} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../shared/services/contentful-content.service';
import {Sidebar} from '../../shared/components/sidebar/sidebar.component.ts';
import {ToDate} from '../../shared/pipes/to-date.pipe';
import {ContentfulNodePage} from '../../shared/structures/aliases.structures';

@Component({
  template: <string> require('./blogs-list.component.html'),
  providers: [ContentfulService],
  styles: [<string> require('./blogs-list.component.styl')],
  directives: [...ROUTER_DIRECTIVES, Sidebar],
  pipes: [AsyncPipe, ToDate]
})
export class BlogsList implements OnInit {
  private contentId: string;
  // TODO: remove limit
  private limit: number = 6;
  private blogs: Observable<ContentfulNodePage[]>;

  constructor(private _contentfulContent: ContenfulContent,
              _injector: Injector) {
    let routeData = _injector.parent.parent.get(RouteData);
    this.contentId = routeData.get('contentId');
  }

  ngOnInit(): void {
    this.blogs = this._contentfulContent.getLatestPosts(this.limit);
  }
}
