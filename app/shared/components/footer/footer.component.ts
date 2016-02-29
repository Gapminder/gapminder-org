import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'footer',
  template: <string> require('./footer.component.html'),
  styles: [<string> require('./footer.scss')],
  directives: [...ROUTER_DIRECTIVES],
})
export class Footer {
}
