import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
import {AppComponent} from './app.component';
import {provide, ComponentRef, PLATFORM_DIRECTIVES} from '@angular/core';
import {Ng2ContentfulConfig} from 'ng2-contentful/src/index';
import {HTTP_PROVIDERS} from '@angular/http';
import {appInjector} from './shared/tools/app-injector.tool';
import {ContentfulImageDirective} from './shared/directives/contentful-image.directive';
import {ContenfulContent} from './shared/services/contentful-content.service';
import {TwitterService} from './shared/services/twitter.service';
import {ContentfulService} from 'ng2-contentful/src/index';
import DynamicRouteConfigurator from './shared/services/dynamic-route-configurator.service';
import {RoutesGatewayService} from './shared/services/routes-gateway.service';
import {Angulartics2} from 'angulartics2/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {BreadcrumbsService} from './shared/components/breadcrumbs/breadcrumbs.service';

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
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    Angulartics2,
    DynamicRouteConfigurator,
    ContentfulService,
    ContenfulContent,
    TwitterService,
    BreadcrumbsService,
    RoutesGatewayService,
    Angulartics2GoogleAnalytics,
    provide(LocationStrategy, {
      useClass: HashLocationStrategy
    }),
    provide(PLATFORM_DIRECTIVES, {
      useValue: ContentfulImageDirective, multi: true
    })
  ]).then(
    (appRef: ComponentRef<any>) => {
      // workaround to get usable injector
      // probably it'l be removed in stable version
      appInjector(appRef.injector);
    }
  );
