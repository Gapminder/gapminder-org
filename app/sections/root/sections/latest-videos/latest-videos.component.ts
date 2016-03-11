import {Component, Input} from 'angular2/core';
import {DatePipe, AsyncPipe} from 'angular2/common';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {transformResponse} from '../../../../shared/tools/response.tools';
import {ContentfulConfig} from '../../../../app.constans';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'latest-videos',
  template: <string> require('./latest-videos.html'),
  styles: [<string> require('./latest-videos.css')],
  pipes: [DatePipe, AsyncPipe]
})
export class LatestVideosComponent {
  @Input() private limit:number = 3;

  private videos:Observable<any>;

  constructor(private _contentful: ContentfulService) {
  }

  private toDate(dateAsString):Date {
    if (!dateAsString) {
      return new Date();
    }
    return new Date(dateAsString);
  }

  ngOnInit():any {
    this.videos = this._contentful
      .withLinksLevel(2)
      .searchEntries(
        ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        {param: 'fields.type', value: 'video'}
      )
      .map(response => response.json())
      .map(response => transformResponse<any>(response));
  }
}
