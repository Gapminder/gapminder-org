import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'gm-subscribe',
  template: require('./subscribe.html') as string,
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./subscribe.styl') as string]
})
export class SubscribeComponent {

}
