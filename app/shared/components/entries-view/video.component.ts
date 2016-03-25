import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
@Component({
  selector: 'video-entry',
  template: `
    <iframe
      width="100%"
      height="315"
      src="{{ entry.fields.youtube }}"
      frameborder="0"
      allowfullscreen="">
    </iframe>
  `
})
export class VideoEntry {
  @Input() private entry;
}
