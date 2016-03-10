import {Component, View} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Collapse, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


const listCharts = [
  {
    name: 'Bubbles Chart',
    href: 'tools/bubbles',
    description: 'Explore a Wo rld the motion with animated statistics'
  }, {
    name: 'Map Chart',
    href: 'tools/map',
    description: 'Explore a World the motion with animated statistics'
  }, {
    name: 'Mountain Charts',
    href: 'tools/mountain',
    description: 'Explore a World the motion with animated statistics'
  }
];

const listFacts = [
  {
    name: 'Answers',
    href: '',
    description: 'Wath Hans Rosling answer huge fact-questions in less than 90 sec.'
  }, {
    name: 'Massive Ignorance',
    href: '',
    description: 'Beware the shocking results from our global knowladge surveys'
  }, {
    name: 'Awards',
    href: '',
    description: 'Explore a World in motion with animated statistics'
  }, {
    name: 'Data',
    href: '',
    description: 'Download tables with stats gathered form hundreds of sources'
  }
];

@Component({
  selector: 'header',
  template: <string> require('./header.html'),
  styles: [<string> require('./header.styl')],
  directives: [
    NgFor,
    NgIf,
    Collapse,
    DROPDOWN_DIRECTIVES,
    ROUTER_DIRECTIVES
  ]
})
export class Header {
  private listCharts:Array<any> = listCharts;
  private listFacts:Array<any> = listFacts;

  constructor() {
  }
}
