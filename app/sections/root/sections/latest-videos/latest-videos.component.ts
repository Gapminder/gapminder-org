import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {DatePipe, AsyncPipe} from 'angular2/common';
import {ContentfulConfig} from '../../../../app.constans';
import {Observable} from 'rxjs/Observable';
import {ContentfulService, ContentfulIterableResponse, ContentfulCommon} from 'ng2-contentful';
import {NodePageContent} from '../../../../shared/structures/content-type.structures';

@Component({
  selector: 'latest-videos',
  template: <string> require('./latest-videos.html'),
  styles: [<string> require('./latest-videos.styl')],
  directives: [ROUTER_DIRECTIVES],
  pipes: [DatePipe, AsyncPipe]
})
export class LatestVideosComponent {
  @Input()
  private limit: number = 3;

  private videos: Observable<ContentfulCommon<NodePageContent>[]>;

  constructor(private _contentful: ContentfulService) {
  }

  private toDate(dateAsString): Date {
    if (!dateAsString) {
      return new Date();
    }
    return new Date(dateAsString);
  }

  ngOnInit(): any {
    this.videos = this._contentful
      .create()
      .searchEntries(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        {param: 'fields.type', value: 'video'}
      )
      .limit(this.limit)
      .commit<ContentfulIterableResponse<ContentfulCommon<NodePageContent>>>()
      .map(response => response.items);
  }
}
