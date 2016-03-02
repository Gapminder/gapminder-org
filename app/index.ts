import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app.component';
import {provide} from 'angular2/core';
import {Ng2ContentfulConfig} from 'ng2-contentful/dist/ng2-contentful';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {Injector} from 'angular2/core';
import {ContentfulContentTypes} from './shared/services/contentful-content-types.service';

// global styles
require('style!./app.scss');

Ng2ContentfulConfig.config = {
  accessToken: '7e33820119e63f72f286be1f474e89be6eafc4af751b2e91b93f130abc5a20a1',
  space: 'we1a0j890sea'
};

// fetch all content types before bootstrap
function bootstrapApp() {
  bootstrap(AppComponent, [
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    ContentfulService,
    provide(LocationStrategy, {
      useClass: HashLocationStrategy
    })
  ]);
}

(
  () => {
    // fetch types before bootstrap
    let injector = Injector.resolveAndCreate([
      ContentfulService,
      ...HTTP_PROVIDERS
    ]);
    let contentful: ContentfulService = injector.get(ContentfulService);
    contentful
      .getContentTypes()
      .map(response => response.json().items)
      .subscribe(
        items => {
          ContentfulContentTypes.contentTypes = items;
          bootstrapApp();
        }
      );
  }
)();




