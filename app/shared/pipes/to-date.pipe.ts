import {Pipe} from 'angular2/core';
import {PipeTransform} from 'angular2/core';

@Pipe({
  name: 'toDate'
})
export class ToDate implements PipeTransform {
  transform(value: string, args: any[]): any {
    if (value) {
      //TODO add check for invalid date
      return new Date(value);
    }
    return undefined;
  }
}
