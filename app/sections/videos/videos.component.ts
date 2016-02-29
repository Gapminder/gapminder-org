import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {RouteData, RouteConfig} from 'angular2/router';
import {VideosList} from './videos-list.component';
import {VideoDetails} from './video-details.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  directives: [...ROUTER_DIRECTIVES],
  template: `
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {path: '/', component: VideosList, name: 'List'},
  {path: '/:slug', component: VideoDetails, name: 'Details'}
])
export class Videos {
}
