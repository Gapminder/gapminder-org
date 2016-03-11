import {Component, OnInit, Input} from 'angular2/core';
import {DatePipe, AsyncPipe} from 'angular2/common';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {transformResponse} from '../../../../shared/tools/response.tools';
import {ContentfulConfig} from '../../../../app.constans';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'latest-posts',
  template: <string> require('./latest-posts.html'),
  styles: [<string> require('./latest-posts.styl')],
  pipes: [DatePipe, AsyncPipe]
})
export class LatestPostsComponent implements OnInit {
  @Input()
  private limit:number = 3;

  private posts:Observable<any>;

  constructor(private _contentful:ContentfulService) {
  }

  private toDate(dateAsString):Date {
    return new Date(dateAsString);
  }

  ngOnInit():any {
    this.posts = this._contentful
      .withLinksLevel(2)
      .searchEntries(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        {param: 'fields.type', value: 'blogpost'}
      )
      .map(response => response.json())
      .map(response => transformResponse<any>(response));
  }
}
