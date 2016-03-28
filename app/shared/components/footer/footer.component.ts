import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Collapse, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';


const menuFooter = [
  {
    name: 'About',
    slug: 'About'
  }, {
    name: 'Contact',
    slug: 'Contact'
  }, {
    name: 'Blog',
    slug: 'Blogs',
    properties: 'List'
  }, {
    name: 'Donate',
    slug: 'Donate'
  }, {
    name: 'Terms',
    slug: 'Terms'
  }, {
    name: 'Media',
    slug: 'Media'
  }, {
    name: 'Help',
    slug: 'Help'
  }, {
    name: 'Labs',
    slug: 'Labs'
  }, {
    name: 'Report problem',
    slug: 'Report'
  }
];

@Component({
  selector: 'footer',
  template: <string> require('./footer.html'),
  directives: [
    NgFor,
    Collapse,
    DROPDOWN_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  styles: [<string> require('./footer.styl')]

})
export class Footer {
  private menuFooter:Array<any> = menuFooter;

  constructor() {
  }
}
