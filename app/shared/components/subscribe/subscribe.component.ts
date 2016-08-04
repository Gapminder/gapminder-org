import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Angulartics2On } from 'angulartics2/index';

@Component({
  selector: 'gm-subscribe',
  template: require('./subscribe.html') as string,
  directives: [ROUTER_DIRECTIVES, Angulartics2On],
  styles: [require('./subscribe.styl') as string]
})
export class SubscribeComponent {

}
