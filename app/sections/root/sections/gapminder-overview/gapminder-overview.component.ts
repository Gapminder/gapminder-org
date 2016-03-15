import {Component, ViewEncapsulation} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';

@Component({
  selector: 'gapminder-overview',
  encapsulation: ViewEncapsulation.None,
  template: <string> require('./gapminder-overview.html'),
  directives: [CAROUSEL_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  styles: [
    <string> require('./gapminder-overview.styl')
  ],
})


export class GapminderOverviewComponent {

  private head: string = 'A Fact-Based Worldview';
  private myInterval: number = 5000;
  private noWrapSlides: boolean = false;
  private slides: Array<any> = [
    {
      image: 'https://pbs.twimg.com/profile_images/116939798/Hans_Rosling_liten_400x400.jpg',
      date: 'November 12, 2015',
      title: 'How not to be ignorant about the World',
      description: 'Hans Rosling and Ola Rosling demonstrates that you have a high statistical chance of being quite wrong about what you think you know. Learn how to get less ignorant.',
      more_info: 'Watch the talk »'
    },
    {
      image: 'http://www.gapminder.org/GapminderMedia/wp-uploads/dont_panic_splash3.jpg',
      date: 'November 12, 2015',
      title: 'How not to be ignorant about the World',
      description: 'Hans Rosling and Ola Rosling demonstrates that you have a high statistical chance of being quite wrong about what you think you know. Learn how to get less ignorant.',
      more_info: 'Watch the talk »'
    }
  ];
}
