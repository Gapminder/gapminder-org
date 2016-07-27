import { bootstrap } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { AppComponent } from './app.component';
import { ComponentRef, PLATFORM_DIRECTIVES } from '@angular/core';
import { Ng2ContentfulConfig, ContentfulService } from 'ng2-contentful';
import { HTTP_PROVIDERS } from '@angular/http';
import { TwitterService } from './shared/services/twitter.service';
import { Angulartics2 } from 'angulartics2/index';
import { DynamicContentDetailsComponent } from './shared/components/dynamic-content/dynamic-content-details.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { APP_ROUTER_PROVIDER, appRoutes } from './routes';
import {
  appInjector,
  GAPMINDER_PROVIDERS,
  ContentfulImageDirective
} from 'ng2-contentful-blog';

const ContentfulConfig = require('./contentTypeIds.json');
declare var CONTENTFUL_ACCESS_TOKEN: string;
declare var CONTENTFUL_SPACE_ID: string;
declare var CONTENTFUL_HOST: string;

// contentful config
Ng2ContentfulConfig.config = {
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID,
  host: CONTENTFUL_HOST
};

// run app and get ref to global DI
bootstrap(AppComponent, [
  Angulartics2,
  TwitterService,
  ContentfulService,
  Angulartics2GoogleAnalytics,
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDER,
  GAPMINDER_PROVIDERS,
  {provide: APP_BASE_HREF, useValue: '/'},
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  {provide: 'Routes', useValue: appRoutes},
  {provide: 'DefaultArticleComponent', useValue: DynamicContentDetailsComponent},
  {provide: 'ContentfulTypeIds', useValue: ContentfulConfig},
  {provide: PLATFORM_DIRECTIVES, useValue: ContentfulImageDirective, multi: true}
]).then(
  (appRef: ComponentRef<any>) => {
    appInjector(appRef.injector);
  }
);
