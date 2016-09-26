import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ContentfulService } from 'ng2-contentful';
import { HttpModule } from '@angular/http';
import { Angulartics2Module } from 'angulartics2/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { routing, routes } from './routes';
import { RootComponent } from './sections/root/root.component';
import { BrowserModule } from '@angular/platform-browser';
import { TwitterService } from './shared/services/twitter.service';
import { CommonModule } from '@angular/common';
import { DynamicContentDetailsComponent } from './shared/components/dynamic-content/dynamic-content-details.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SearchComponent } from './shared/components/search/search.component';
import { LatestComponent } from './shared/components/gm-latest/latest.component';
import { TweetsComponent } from './sections/root/sections/tweets/tweets.component';
import { SubscribeComponent } from './shared/components/subscribe/subscribe.component';
import { GapminderOverviewComponent } from './sections/root/sections/gapminder-overview/gapminder-overview.component';
import { CarouselModule } from 'ng2-bootstrap';
import { Ng2ContentfulBlogModule } from 'ng2-contentful-blog';

const Constants = require('./constants');
const ContentfulConfig = require('./contentTypeIds.json');

declare var CONTENTFUL_ACCESS_TOKEN: string;
declare var CONTENTFUL_SPACE_ID: string;
declare var CONTENTFUL_HOST: string;

@NgModule({
  declarations: [
    AppComponent,
    DynamicContentDetailsComponent,
    RootComponent,
    HeaderComponent,
    SearchComponent,
    SubscribeComponent,
    GapminderOverviewComponent,
    LatestComponent,
    TweetsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    CarouselModule,
    Ng2ContentfulBlogModule,
    Angulartics2Module.forRoot(),
    routing
  ],
  entryComponents: [DynamicContentDetailsComponent],
  providers: [
    TwitterService,
    ContentfulService,
    Angulartics2GoogleAnalytics,
    {provide: 'ContentfulConfiguration', useValue: {
      accessToken: CONTENTFUL_ACCESS_TOKEN,
      spaceId: CONTENTFUL_SPACE_ID,
      host: CONTENTFUL_HOST
    }},
    {provide: 'Routes', useValue: routes},
    {provide: 'DefaultArticleComponent', useValue: DynamicContentDetailsComponent},
    {provide: 'ContentfulTypeIds', useValue: ContentfulConfig},
    {provide: 'Constants', useValue: Constants}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
