
import {Pipe} from 'angular2/core';
import {PipeTransform} from 'angular2/core';
import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  transform(value: any, args: any[]): string {
    return marked(value);
  }
}
