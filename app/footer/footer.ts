import {Component, View} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {Collapse, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


let menuFooter = [
  {
    name: 'About',
    href: ''
  }, {
    name: 'Contact',
    href: ''
  }, {
    name: 'Blog',
    href: ''
  }, {
    name: 'Donate',
    href: ''
  }, {
    name: 'Terms',
    href: ''
  }, {
    name: 'Media',
    href: ''
  }, {
    name: 'Help',
    href: ''
  }, {
    name: 'Labs',
    href: ''
  }, {
    name: 'Report problem',
    href: ''
  }
];

let template = `
   <footer>
      <div class="footer-logo">
        <img src="../assets/img/logo.svg">
        <ul>
          <li><a href="">Gapminder World</a> </li>
          <li><a href="">For Teachers</a> </li>
        </ul>

      </div>
      <div class="container">
        <ul class="nav navbar-nav">
          <li *ngFor="#item of menuFooter">
            <a class="dropdown-item" href="{{item.href}}">
              {{item.name}}
              <span>{{item.description}}</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>`;

@Component({
  selector: 'footer-gapminder',
  template: template,
  directives: [
    NgFor,
    Collapse,
    DROPDOWN_DIRECTIVES
  ],
  styles: [require('./footer.css')]

})
export class Footer {
  private menuFooter:Array<any> = menuFooter;

  constructor() {
  }
}
