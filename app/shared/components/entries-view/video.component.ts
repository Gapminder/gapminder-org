import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
@Component({
  selector: 'video-entry',
  styles: [
    <string> require('./video-entry.styl')
  ],
  template: `
    <div class="video-wrapper">
      <iframe
        src="{{ entry.fields.youtube || entry.fields.vimeo }}"
        frameborder="0" 
        webkitallowfullscreen="" 
        mozallowfullscreen="" 
        allowfullscreen="">
      </iframe>
    </div>
  `
})
export class VideoEntry {
  @Input() private entry;
}
