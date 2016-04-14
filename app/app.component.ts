import {Component, ViewEncapsulation, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Header} from './shared/components/header/header.component';
import {Footer} from './shared/components/footer/footer.component';
import {Root} from './sections/root/root.component';
import {DynamicContent} from './shared/components/dynamic-content/dynamic-content.component';
import {DynamicComponentDetails} from './shared/components/dynamic-content/dynamic-content-details.component';


@Component({
  selector: 'gapminder-app',
  encapsulation: ViewEncapsulation.None,
  directives: [Header, Footer, ...ROUTER_DIRECTIVES],
  styles: [
    <string> require('./main.styl'),
    <string> require('./fonts.styl'),
    <string> require('./variables.styl')
  ],
  template: `
    <header></header>
     <div class="container">
        <router-outlet></router-outlet>
     </div>
    <footer></footer>
  `
})
// TODO: remove hardcode (component: About)
@RouteConfig([
  {path: '/', component: Root, name: 'Root', useAsDefault: true},
  {path: '/:contentType', component: DynamicContent, name: 'DynamicContent'},
  {
    path: '/:contentType/:contentSlug',
    component: DynamicComponentDetails,
    name: 'DynamicContentDetails'
  },
  {path: '/**', redirectTo: ['Root']}
])
export class AppComponent implements OnInit {
  type: string = 'app component';

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
    this._router.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}
