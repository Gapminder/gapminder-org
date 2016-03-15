import {Component, OnInit, Input} from 'angular2/core';
import {DatePipe, AsyncPipe} from 'angular2/common';
import {ContentfulConfig} from '../../../../app.constans';
import {Observable} from 'rxjs/Observable';
import {ContentfulService, ContentfulCommon, ContentfulIterableResponse} from 'ng2-contentful';
import {NodePageContent} from '../../../../shared/structures/content-type.structures';

@Component({
  selector: 'latest-posts',
  template: <string> require('./latest-posts.html'),
  styles: [<string> require('./latest-posts.styl')],
  pipes: [DatePipe, AsyncPipe]
})
export class LatestPostsComponent implements OnInit {
  @Input()
  private limit: number = 3;

  private posts: Observable<ContentfulCommon<NodePageContent>[]>;

  constructor(private _contentful: ContentfulService) {
  }

  private toDate(dateAsString): Date {
    return new Date(dateAsString);
  }

  ngOnInit(): any {
    this.posts = this._contentful
      .create()
      .searchEntries(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        {param: 'fields.type', value: 'blogpost'}
      )
      .limit(this.limit)
      .commit<ContentfulIterableResponse<ContentfulCommon<NodePageContent>>>()
      .map(response => response.items);
  }
}
