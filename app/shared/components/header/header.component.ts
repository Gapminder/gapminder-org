import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'header',
  directives: [...ROUTER_DIRECTIVES],
  template: <string> require('./header.component.html'),
  styles: [<string> require('./header.component.scss')]
})
export class Header {
}
