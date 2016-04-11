import {Component, Input} from 'angular2/core';
import {DonateSection} from './donate/donate.component';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'sidebar',
  template: <string> require('./sidebar.html'),
  styles: [
    <string> require('./sidebar.styl')
  ],
  directives: [DonateSection, RouterLink]
})

export class Sidebar {

  @Input()
  private relatedItems: Array<any> = [];

  @Input()
  private contentType:string;

}
