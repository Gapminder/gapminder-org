import {Component} from 'angular2/core';
import {OnActivate, RouteData, RouteParams, ComponentInstruction} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {ContentfulConfig} from '../../app.constans.ts';
import {ContentfulTypes as ct} from 'ng2-contentful/dist/ng2-contentful';
import {transformResponse} from '../../shared/tools/response.tools';
import {EntriesView} from '../../shared/components/entries-view/entries-view.component';

@Component({
  template: <string> require('./video-details.component.html'),
  styles: [<string> require('./video-details.component.styl')],
  directives: [EntriesView]
})
export class VideoDetails implements OnActivate {
  private content: any;

  constructor(private _params: RouteParams,
              private _contentful: ContentfulService) {
  }

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction): any {
    return new Promise(
      (resolve) => {
        let slug = this._params.get('slug');
        this._contentful
          .withLinksLevel(2)
          .getEntryBySlug(
            ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
            slug
          )
          .map(response => response.json())
          .map(response => transformResponse<any>(response))
          .subscribe(
            response => {
              if (response.length) {
                this.content = response[0].fields;
              }
              resolve(true);
            }
          );
      }
    );
  }
}
