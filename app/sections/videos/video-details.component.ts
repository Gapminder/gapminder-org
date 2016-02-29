import {Component} from 'angular2/core';

@Component({
  template: `
    <h1>
      {{ title }}
    </h1>
  `
})
export class VideoDetails {
  private title = 'Test title';
}
