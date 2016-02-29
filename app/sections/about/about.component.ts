import {Component} from 'angular2/core';
import {RouteData, RouteParams} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {ContentfulTypes as ct} from 'ng2-contentful/dist/ng2-contentful';
import {ContenfulConfig} from '../../app.constans';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MarkdownPipe} from '../../shared/pipes/markdown.pipe';
import {OnActivate, ComponentInstruction, OnReuse} from 'angular2/router';

/**
 *
 */
@Component({
  template: <string> require('./about.component.html'),
  host: {
    class: 'content'
  },
  directives: [...ROUTER_DIRECTIVES],
  providers: [ContentfulService],
  styles: [<string> require('./about.scss')],
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
            ContenfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
            slug
          )
          .map(response => response.json())
          .subscribe(
            response => {
              this.processResponse(response);
              resolve(true);
            },
            error => console.log(error)
          );
      }
    );
  }

  private processResponse(response: ct.IterableResponse<any>) {
    let includes = {};
    for (let entry of response.includes.Entry) {
      includes[entry.sys.id] = entry.fields;
    }
    // about subsection menu
    let item = response.items[0];
    // add self
    includes[item.sys.id] = item.fields;
    let subsectionSysId = item.fields.subsections.sys.id;
    // collect subsections
    for (let subsection of includes[subsectionSysId].nodes) {
      this.submenuItems.push(
        includes[subsection.sys.id]
      );
    }
    this.content = item.fields;
    let entries = [];
    for (let entry of this.content.entries) {
      entries.push(
        includes[entry.sys.id]
      );
    }
    this.content.entries = entries;
  }
}
