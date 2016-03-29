
import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {checkContentType} from './tools';

@Component({
  template: `<h2>Detail</h2>`
})
@CanActivate(checkContentType)
export class DynamicComponentDetails {
}
