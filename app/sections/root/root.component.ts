import {Component} from '@angular/core';
import {LatestPostsComponent} from './sections/latest-posts/latest-posts.component';
import {GapminderOverviewComponent} from './sections/gapminder-overview/gapminder-overview.component';
import {LatestVideosComponent} from './sections/latest-videos/latest-videos.component';
import {TweetsComponent} from './sections/tweets/tweets.component';

@Component({
  selector: 'gm-root',
  template: require('./root.component.html') as string,
  styles: [require('./root.component.styl') as string],
  directives: [
    GapminderOverviewComponent,
    LatestVideosComponent,
    LatestPostsComponent,
    TweetsComponent
  ]
})
export class RootComponent {

}
