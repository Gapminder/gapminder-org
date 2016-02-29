import {Component} from 'angular2/core';
import {RouteData, RouteParams} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {ContentfulTypes as ct} from 'ng2-contentful/dist/ng2-contentful';
import {ContenfulConfig} from '../../app.constans';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MarkdownPipe} from '../../shared/pipes/markdown.pipe';

/**
 *
 */
@Component({
  template: <string> require('./about.component.html'),
  directives: [...ROUTER_DIRECTIVES],
  providers: [ContentfulService],
  styles: [<string> require('./about.scss')],
  pipes: [MarkdownPipe]
})
export class About {
  private content: any;
  private submenuItems: any[] = [];

  constructor(private _routerData: RouteData,
              private _params: RouteParams,
              private _contentful: ContentfulService) {
    let slug = _params.get('slug') || _routerData.get('contentfulSlug');
    _contentful
      .withLinksLevel(2)
      .getEntryBySlug(
        ContenfulConfig.CONTENTFUL_NODE_PAGE_TYPE_ID,
        slug
      )
      .subscribe(
        response => this.processResponse(response.json())
      );
  }

  private processResponse(response: ct.IterableResponse<any>) {
    //this.submenuItems = response.includes;
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
