import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

console.log(typeof require('./header.component.html'));

@Component({
  selector: 'header',
  directives: [...ROUTER_DIRECTIVES],
  template: <string> require('./header.component.html')
})
export class Header {
}
