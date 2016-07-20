import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
import { AsyncPipe } from '@angular/common';
import { FooterMenuComponent } from 'ng2-contentful-blog';
import { Angulartics2On } from 'angulartics2/index';

@Component({
  selector: 'gm-footer',
  encapsulation: ViewEncapsulation.None,
  template: require('./footer.html') as string,
  directives: [RouterLink, Angulartics2On, FooterMenuComponent],
  styles: [require('./footer.styl') as string],
  pipes: [AsyncPipe]
})
export class FooterComponent {

}
