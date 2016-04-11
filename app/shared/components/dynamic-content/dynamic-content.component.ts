import {Component, ViewEncapsulation, ElementRef} from 'angular2/core';
import {CanActivate, ComponentInstruction, OnActivate, RouterLink} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../services/contentful-content.service';
import {ToDate} from '../../pipes/to-date.pipe';
import {checkContentType, DynamicContentRouteParams, encapsulateCss, DynamicContentRouteData} from './tools';
import {DomSharedStylesHost} from 'angular2/src/platform/dom/shared_styles_host';
import {Sidebar} from '../sidebar/sidebar.component';
import {PageStructure} from "../../services/page-structure.service";

@Component({
  template: <string> require('./dynamic-content.component.html'),
  directives: [RouterLink, Sidebar],
  host: {'[attr.id]': 'id'},
  styles: [
    <string> require('./dynamic-content.component.styl')
  ],
  encapsulation: ViewEncapsulation.None,
  pipes: [ToDate]
})
@CanActivate(checkContentType)
export class DynamicContent implements OnActivate {
  private items: Observable<any>;
  private contentType: string;
  private id: string;
  private descriptionTitle: string;

  constructor(private _hostStyles: DomSharedStylesHost,
              private _contentfulContent: ContenfulContent,
              private pageStructure: PageStructure) {
  }

  routerOnActivate(next: ComponentInstruction): void {
    // add custom styles
    this.contentType = (next.params as DynamicContentRouteParams).contentType;
    this.id = this.contentType;
    let params: DynamicContentRouteData = next.routeData.data;
    if (params.customCss) {
      this._hostStyles.addStyles([
        encapsulateCss(params.customCss, `#${this.contentType}`)
      ]);
    }

    let structureChildrens = this.pageStructure.structure.children;
    this.contentType = (next.params as DynamicContentRouteParams).contentType;

    for (let structureChildren of structureChildrens) {
      let fields = structureChildren.fields;
      if (fields.type === this.contentType) {
        this.descriptionTitle = fields.description;
      }
    }

    this.items = this._contentfulContent.getNodePagesByType(
      this.contentType
    );

  }
}
