import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FooterMenuComponent } from 'ng2-contentful-blog';
import { Angulartics2On } from 'angulartics2/index';

@Component({
  selector: 'gm-footer',
  encapsulation: ViewEncapsulation.None,
  template: require('./footer.html') as string,
  directives: [ROUTER_DIRECTIVES, Angulartics2On, FooterMenuComponent],
  styles: [require('./footer.styl') as string],
  pipes: [AsyncPipe]
})
export class FooterComponent {

}
