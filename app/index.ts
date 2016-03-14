/// <reference path="../typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app.component';
import {provide, ComponentRef, PLATFORM_DIRECTIVES} from 'angular2/core';
import {Ng2ContentfulConfig} from 'ng2-contentful';
import {HTTP_PROVIDERS} from 'angular2/http';
import {appInjector} from './shared/tools/app-injector.tool';
import {ContentfulImageDirective} from './shared/directives/contentful-image.directive';
import {ContenfulContent} from './shared/services/contentful-content.service';
import {ContentfulService} from 'ng2-contentful';

declare var CONTENTFUL_ACCESS_TOKEN: string;
declare var CONTENTFUL_SPACE_ID: string;

// contentful config
Ng2ContentfulConfig.config = {
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID
};

// run app and get ref to global DI
bootstrap(AppComponent, [
  ...ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  ContentfulService,
  ContenfulContent,
  provide(LocationStrategy, {
    useClass: HashLocationStrategy
  }),
  provide(PLATFORM_DIRECTIVES, {
    useValue: ContentfulImageDirective, multi: true})
]).then(
  (appRef: ComponentRef) => {
    appInjector(appRef.injector);
  }
);




