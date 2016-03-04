import {Component, View} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {Collapse, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


let listCharts = [
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

let listFacts = [
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

let template = `
    <header class="navbar">
    <div class="container">
      <nav class="hidden-xs hidden-xs-down">
        <ul class="nav navbar-nav">
          <li class="nav-item dropdown" dropdown>

            <a href id="simple-dropdown" dropdownToggle>Gapminder World</a>
            <ul class="dropdown-menu diff" role="menu" aria-labelledby="split-button">
              <li *ngFor="#chart of listCharts">
               <a class="dropdown-item" href="{{chart.href}}">

                  {{chart.name}}
                  <span>{{chart.description}}</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item"><a href="#" role="button">Videos</a></li>
          <li class="nav-item"><a href="#" role="button">Downloads</a></li>
          <li class="nav-item"><a href="#" role="button">Teach</a></li>
          <li class="nav-item dropdown" dropdown>
            <a href id="simple-dropdown" dropdownToggle>Facts</a>
            <ul class="dropdown-menu fix-width" role="menu" aria-labelledby="split-button">
              <li class="col-md-6 padding-0" *ngFor="#fast of listFacts">
               <a class="dropdown-item" href="{{fast.href}}">
                {{fast.name}}
                <span>{{fast.description}}</span>
               </a>
              </li>
            </ul>
          </li>
          <li class="nav-item"><a href="#" role="button">News</a></li>
          <li class="nav-item"><a href="#" role="button">About</a></li>
          <li class="nav-item"><a href="#" role="button">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>`;

@Component({
  selector: 'header-gapminder',
  template: template,
  directives: [
    NgFor,
    Collapse,
    DROPDOWN_DIRECTIVES
  ],
  styles: [require('./header.css')]

})
export class Header {
  private listCharts:Array<any> = listCharts;
  private listFacts:Array<any> = listFacts;

  constructor() {
  }
}
