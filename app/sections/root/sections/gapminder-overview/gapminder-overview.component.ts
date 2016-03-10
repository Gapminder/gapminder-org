import {Component} from 'angular2/core';

@Component({
  selector: 'gapminder-overview',
  template: <string> require('./gapminder-overview.html'),
  styles: [
    <string> require('./gapminder-overview.css')
  ],
})
export class GapminderOverviewComponent {

}
