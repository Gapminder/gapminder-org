import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Header} from './shared/components/header/header.component';
import {Footer} from './shared/components/footer/footer.component';
import {Root} from './sections/root/root.component';
import {Videos} from './sections/videos/components/videos.component';
import {Downloads} from './sections/downloads/components/downloads.component';
import {ContenfulConfig} from './app.constans';
import {About} from './sections/about/about.component';

@Component({
  selector: 'gapminder-app',
  directives: [Header, Footer, ...ROUTER_DIRECTIVES],
  template: `
    <header></header>
    <router-outlet></router-outlet>
    <footer></footer>
  `
})
@RouteConfig([
  {path: '/', component: Root, name: 'Root', useAsDefault: true},
  {
    path: '/videos', component: Videos, name: 'Videos',
    data: {
      contentId: ContenfulConfig.VIDEOS_CONTENT_ID
    }
  },
  {path: '/downloads', component: Downloads, name: 'Downloads'},
  {
    path: '/about/', component: About, name: 'About',
    data: {
      contentfulSlug: ContenfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/about/:slug', component: About, name: 'AboutSubsection'
  },
  {path: '/**', redirectTo: ['Root']}
])
export class AppComponent {
  type: string = 'app component';
}
