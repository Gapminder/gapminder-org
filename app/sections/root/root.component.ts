import { Component } from '@angular/core';
import { GapminderOverviewComponent } from './sections/gapminder-overview/gapminder-overview.component';
import { TweetsComponent } from './sections/tweets/tweets.component';
import { LatestComponent } from '../../shared/components/gm-latest/latest.component';

@Component({
  selector: 'gm-root',
  template: require('./root.component.html') as string,
  styles: [require('./root.component.styl') as string],
  directives: [
    GapminderOverviewComponent,
    LatestComponent,
    TweetsComponent
  ]
})
export class RootComponent {

}
