import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BlogsList} from './blogs-list.component';
import {BlogsPost} from './blogs-post.component';

@Component({
  directives: [...ROUTER_DIRECTIVES],
  template: `
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {path: '/', component: BlogsList, name: 'List'},
  {path: '/:slug', component: BlogsPost, name: 'Details'}
])
export class Blogs {
}
