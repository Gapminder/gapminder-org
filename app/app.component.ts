import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Header} from './shared/components/header/header.component';
import {Footer} from './shared/components/footer/footer.component';
import {Root} from './sections/root/root.component';
import {Videos} from './sections/videos/videos.component';
import {Downloads} from './sections/downloads/components/downloads.component';
import {ContentfulConfig} from './app.constans';
import {About} from './sections/about/about.component';

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
    path: '/contact/', component: About, name: 'Contact',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/blog/', component: About, name: 'Blog',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/donate/', component: About, name: 'Donate',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/terms/', component: About, name: 'Terms',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/media/', component: About, name: 'Media',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/help/', component: About, name: 'Help',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/labs/', component: About, name: 'Labs',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {
    path: '/report/', component: About, name: 'Report',
    data: {
      contentfulSlug: ContentfulConfig.CONTENTFUL_ABOUT_SLUG
    }
  },
  {path: '/**', redirectTo: ['Root']}
])
export class AppComponent {
  type: string = 'app component';
}
