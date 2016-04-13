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
//TODO: Substitute VideoEntry with EmbeddedEntry (later is more generic and allows to embed various types of content)
export class VideoEntry {
  @Input() private entry;
}
