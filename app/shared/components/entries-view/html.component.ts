import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {MarkdownPipe} from '../../pipes/markdown.pipe';
import {OnInit} from 'angular2/core';

@Component({
  selector: 'html-entry',
  template: `
    <div [innerHTML]="entry.fields.content | markdown"></div>
  `,
  pipes: [MarkdownPipe]
})
export class HtmlEntry {
  @Input() private entry;
}
