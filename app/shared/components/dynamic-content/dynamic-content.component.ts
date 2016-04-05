import {Component, ViewEncapsulation} from 'angular2/core';
import {CanActivate, ComponentInstruction, OnActivate, RouterLink} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../services/contentful-content.service';
import {ToDate} from '../../pipes/to-date.pipe';
import {checkContentType, DynamicContentRouteParams} from './tools';

@Component({
  template: <string> require('./dynamic-content.component.html'),
  directives: [RouterLink],
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

  constructor(private _contentfulContent: ContenfulContent) {
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction): void {
    this.contentType = (<DynamicContentRouteParams>next.params).contentType;
    this.items = this._contentfulContent.getNodePagesByType(
      this.contentType
    );
  }
}
