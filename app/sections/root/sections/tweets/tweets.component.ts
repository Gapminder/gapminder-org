import {Component, Input} from 'angular2/core';

@Component({
  selector: 'tweets',
  template: <string> require('./tweets.html'),
  styles: [
    <string> require('./tweets.css')
  ],
})
export class TweetsComponent {
  @Input() author:string;
}
