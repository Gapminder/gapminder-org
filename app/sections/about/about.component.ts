import {Component} from 'angular2/core';
import {RouteData, RouteParams} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {ContentfulConfig} from '../../app.constans';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MarkdownPipe} from '../../shared/pipes/markdown.pipe';
import {OnActivate, ComponentInstruction} from 'angular2/router';
import {transformResponse} from '../../shared/tools/response.tools';

/**
 *
 */
@Component({
  template: <string> require('./about.component.html'),
  directives: [...ROUTER_DIRECTIVES],
  providers: [ContentfulService],
  styles: [<string> require('./about.component.scss')],
  pipes: [MarkdownPipe]
})
export class About implements OnActivate {
  private content: any;
  private submenuItems: any[] = [];

  constructor(private _routerData: RouteData,
              private _params: RouteParams,
              private _contentful: ContentfulService) {
  }

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction): any {
    return new Promise(
      (resolve) => {
        let slug = this._params.get('slug') || this._routerData.get('contentfulSlug');
        this._contentful
          .withLinksLevel(2)
          .getEntryBySlug(
            ContentfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
            slug
          )
          .map(response => response.json())
          .subscribe(
            response => {
              this.submenuItems = this.getSubmenuFromResponse(response);
              this.content = transformResponse<any>(response)[0];
              resolve(true);
            },
            error => console.log(error)
          );
      }
    );
  }

  private getSubmenuFromResponse(response) {
    let includes = {};
    let submenuItems = [];
    for (let entry of response.includes.Entry) {
      includes[entry.sys.id] = entry.fields;
    }
    // about subsection menu
    let item = response.items[0];
    includes[item.sys.id] = item.fields;
    let subsectionSysId = item.fields.subsections.sys.id;
    // collect subsections
    for (let subsection of includes[subsectionSysId].nodes) {
      submenuItems.push(
        includes[subsection.sys.id]
      );
    }
    return submenuItems;
  }
}
