import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
@Component({
  selector: 'embedded-entry',
  styles: [
    <string> require('./video-entry.styl')
  ],
  template: `
    <div class="video-wrapper">
      <iframe
        src="{{ entry.fields.link }}"
        frameborder="0" 
        webkitallowfullscreen="" 
        mozallowfullscreen="" 
        allowfullscreen="">
      </iframe>
    </div>
  `
})
export class EmbeddedEntry {
  @Input() private entry;
}
