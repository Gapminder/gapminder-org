import {Component, ViewEncapsulation} from '../node_modules/angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '../node_modules/angular2/router';
import {Header} from './shared/components/header/header.component.ts';
import {Footer} from './shared/components/footer/footer.component.ts';
import {Root} from './sections/root/root.component.ts';
import {Videos} from './sections/videos/videos.component.ts';
import {Downloads} from './sections/downloads/components/downloads.component.ts';
import {ContentfulConfig} from './app.constans.ts';
import {About} from './sections/about/about.component.ts';

@Component({
  selector: 'gapminder-app',
  encapsulation: ViewEncapsulation.None,
  directives: [Header, Footer, ...ROUTER_DIRECTIVES],
  styles: [ <string> require('./main.styl')],
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
  {
    path: '/videos/...', component: Videos, name: 'Videos',
    data: {
      contentId: ContentfulConfig.VIDEOS_TYPE_NAME
    }
  },
  {path: '/downloads', component: Downloads, name: 'Downloads'},
  {
    path: '/about/', component: About, name: 'About',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/about/:slug', component: About, name: 'AboutSubsection'
  },
  {
    path: '/Contact/', component: About, name: 'Contact',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/Blog/', component: About, name: 'Blog',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/Donate/', component: About, name: 'Donate',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/Terms/', component: About, name: 'Terms',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/Media/', component: About, name: 'Media',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/Help/', component: About, name: 'Help',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/Labs/', component: About, name: 'Labs',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/Report/', component: About, name: 'Report',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {path: '/**', redirectTo: ['Root']}
])
export class AppComponent {
  type: string = 'app component';
}
