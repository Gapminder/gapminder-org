import {Component, ViewEncapsulation} from 'angular2/core';
import {Input} from 'angular2/core';
import {MarkdownPipe} from '../../pipes/markdown.pipe';

@Component({
  selector: 'html-entry',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="block-entry" [innerHTML]="entry.fields.content | markdown"></div>
  `,
  styles: [ <string> require('./entries-html.styl')],
  pipes: [MarkdownPipe]
})
export class HtmlEntry {
  @Input() private entry;
}
