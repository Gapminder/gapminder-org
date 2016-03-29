import {Component} from 'angular2/core';
import {CanActivate, ComponentInstruction, Router, OnActivate, RouterLink} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {ContenfulContent} from '../../services/contentful-content.service';
import {ToDate} from '../../pipes/to-date.pipe';
import {checkContentType} from './tools';

@Component({
  template: <string> require('./dynamic-content.component.html'),
  directives: [RouterLink],
  pipes: [ToDate]
})
@CanActivate(checkContentType)
export class DynamicContent implements OnActivate {
  private items: Observable<any>;
  private contentType: string;

  constructor(private _contentfulContent: ContenfulContent) {
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction): any {
    /* tslint:disable:no-string-literal */
    this.contentType = next.params['contentType'];
    /* tslint:enable:no-string-literal */
    this.items = this._contentfulContent.getNodePagesByType(
      this.contentType
    );
    return undefined;
  }
}
