
import {Component} from 'angular2/core';
import {PostsList} from '../posts/posts-list.component';

@Component({
  template: <string> require('./root.component.html'),
  styles: [
    <string> require('./root.component.scss')
  ],
  directives: [PostsList]
})
export class Root {}
