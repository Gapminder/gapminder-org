
import {Component} from 'angular2/core';
import {LatestPostsComponent} from './sections/latest-posts/latest-posts.component.ts';
import {GapminderOverviewComponent} from './sections/gapminder-overview/gapminder-overview.component';
import {LatestVideosComponent} from './sections/latest-videos/latest-videos.component';
import {TweetsComponent} from './sections/tweets/tweets.component';

@Component({
  template: <string> require('./root.component.html'),
  styles: [
    <string> require('./root.component.scss')
  ],
  directives: [
    GapminderOverviewComponent,
    LatestVideosComponent,
    LatestPostsComponent,
    TweetsComponent
  ]
})
export class Root {}
