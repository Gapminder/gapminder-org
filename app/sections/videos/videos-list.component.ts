import {Component} from 'angular2/core';
import {RouteData} from 'angular2/router';
import {Injector} from 'angular2/core';
import {OnActivate, ComponentInstruction} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {ContenfulConfig} from '../../app.constans';

@Component({
  template: <string> require('./videos-list.component.html'),
  providers: [ContentfulService],
  styles: [ <string> require('./videos-list.component.scss')],
  host: {
    class: 'content'
  }
})
export class VideosList implements OnActivate {
  private contentId: string;
  private videos: any[];

  constructor(private _routeData: RouteData,
              private _contentful: ContentfulService,
              _injector: Injector) {
    let routeData = _injector.parent.parent.get(RouteData);
    this.contentId = routeData.get('contentId');
  }

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction): any {
    return new Promise(
      (resolve) => {
        this._contentful
          .withLinksLevel(2)
          .searchEntries(
            ContenfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
            {param: 'fields.type', value: this.contentId}
          )
          .map(response => response.json())
          .subscribe(
            response => {
              console.log(response);
              this.videos = this.transformResponse(response);
              resolve(true);
            },
            error => console.log(error)
          );
      }
    );
  }

  transformResponse(response: any): any[] {
    let includes = {};
    for (let key in response.includes) {
      if (response.includes.hasOwnProperty(key)) {
        for (let item of response.includes[key]) {
          includes[item.sys.id] = item.fields;
        }
      }
    }
    // replace thumbnails object
    for (let item of response.items) {
      item.fields.thumbnail = includes[item.fields.thumbnail.sys.id];
    }
    return response.items;
  }
}
