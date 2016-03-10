import {Component} from 'angular2/core';
import {RouteData} from 'angular2/router';
import {Injector} from 'angular2/core';
import {OnActivate, ComponentInstruction} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {ContentfulConfig} from '../../app.constans.ts';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {transformResponse} from '../../shared/tools/response.tools';

@Component({
  template: <string> require('./videos-list.component.html'),
  providers: [ContentfulService],
  styles: [<string> require('./videos-list.component.styl')],
  directives: [...ROUTER_DIRECTIVES]
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
            ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
            {param: 'fields.type', value: this.contentId}
          )
          .map(response => response.json())
          .map(response => transformResponse<any>(response))
          .subscribe(
            response => {
              this.videos = response;
              resolve(true);
            },
            error => console.log(error)
          );
      }
    );
  }
}
