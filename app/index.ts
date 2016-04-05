/// <reference path="../typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app.component';
import {provide, ComponentRef, PLATFORM_DIRECTIVES, Injector} from 'angular2/core';
import {Ng2ContentfulConfig} from 'ng2-contentful';
import {HTTP_PROVIDERS} from 'angular2/http';
import {appInjector} from './shared/tools/app-injector.tool';
import {ContentfulImageDirective} from './shared/directives/contentful-image.directive';
import {ContenfulContent} from './shared/services/contentful-content.service';
import {TwitterService} from './shared/services/twitter.service';
import {ContentfulService} from 'ng2-contentful';
import {PageStructure} from './shared/services/page-structure.service';
import {transformResponse} from './shared/tools/response.tools';
import {ContentfulPageStructure} from './shared/structures/aliases.structures';

declare var CONTENTFUL_ACCESS_TOKEN: string;
declare var CONTENTFUL_SPACE_ID: string;

// contentful config
Ng2ContentfulConfig.config = {
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID
};

function main(structure: PageStructure) {
// run app and get ref to global DI
  bootstrap(AppComponent, [
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    ContentfulService,
    ContenfulContent,
    TwitterService,
    // use provided PageStructure instance through factory
    provide(PageStructure, {
      useFactory: () => structure
    }),
    provide(LocationStrategy, {
      useClass: HashLocationStrategy
    }),
    provide(PLATFORM_DIRECTIVES, {
      useValue: ContentfulImageDirective, multi: true
    })
  ]).then(
    (appRef: ComponentRef) => {
      // workaround to get usable injector
      // probably it'l be removed in stable version
      appInjector(appRef.injector);
    }
  );
}

/*
To build the page with the dynamic structure we need to fetch all
node tree before we'll bootstrap our application.
 */
let injector: Injector = Injector.resolveAndCreate([
  ContentfulService, PageStructure, ...HTTP_PROVIDERS
]);
let contentfulService: ContentfulService = injector.get(ContentfulService);
let structure: PageStructure = injector.get(PageStructure);
contentfulService
  .create()
  // trick to fetch includes sub-nodes
  // TODO move it to the ContentfulCOntent service
  .searchEntries('pageTree', {
    param: 'sys.id',
    value: '3f1HYiL4oMSkcOeoWAc4wM'
  })
  .include(3)
  .commit<any>()
  .map(response => transformResponse<ContentfulPageStructure>(response, 2)[0])
  .subscribe(
    response => {
      structure.buildFromContentful(response.fields);
      main(structure);
    }
  );



