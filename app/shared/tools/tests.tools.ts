import {PLATFORM_DIRECTIVES, provide, Directive, ElementRef, Input, Inject} from '@angular/core';
import {ContenfulContent} from '../services/contentful-content.service';
import {AppComponent} from '../../app.component';
import {ROUTER_PRIMARY_COMPONENT, Router, RouteRegistry, RouteDefinition} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {ROUTER_FAKE_PROVIDERS} from '@angular/router/testing';
import {SpyLocation} from '@angular/common/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/observable/bindCallback';
import 'rxjs/add/operator/map';
import {ContentfulNodePage} from '../structures/aliases.structures';
import {TwitterService, Tweet, TwitterUser} from '../services/twitter.service';
import {RoutesGatewayService} from '../services/routes-gateway.service';
import {Angulartics2} from 'angulartics2/index';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';
import {BreadcrumbsService} from '../components/breadcrumbs/breadcrumbs.service';
import DynamicRouteConfigurator from '../services/dynamic-route-configurator.service';

export function getBaseTestProviders(): any[] {
  return [
    provide(PLATFORM_DIRECTIVES, {
      useValue: ContentfulImageDirectiveMock, multi: true
    }),
    provide(RoutesGatewayService, {
      useClass: RoutesGatewayServiceMock
    }),
    DynamicRouteConfigurator,
    BreadcrumbsService,
    provide(ContenfulContent, {
      useClass: ContenfulContentMock
    }),
    provide(TwitterService, {
      useClass: TwitterServiceMock
    }),
    Angulartics2,
    Angulartics2GoogleAnalytics,
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useValue: ROUTER_FAKE_PROVIDERS}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent})
  ];
}

export const TestContentfulNodePage: ContentfulNodePage = {
  fields: {
    title: 'Test title',
    type: 'video',
    slug: 'test-title',
    thumbnail: {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: '4BZswpLtvyq4qAgcu8iws0'
      }
    },
    description: 'description',
    createdAt: '2016-02-29T14:26:46.815Z'
  },
  sys: {
    id: '4dDFOEqrNKa6wSm8sEkGym',
    type: 'Entry',
    createdAt: '2016-02-29T14:26:46.815Z',
    updatedAt: '2016-02-29T14:26:46.815Z',
    revision: 1
  }

};

// TODO move it somewhere else + refactor
export class ContenfulContentMock {

  // noinspection TsLint
  public getLatestVideo(limit: number): Observable<ContentfulNodePage[]> {
    return new Observable((observer: any) => {
      observer.next([TestContentfulNodePage]);
    });
  }

  // noinspection TsLint
  public getLatestPosts(limit: number): Observable<ContentfulNodePage[]> {
    return new Observable((observer: any) => {
      observer.next([TestContentfulNodePage]);
    });
  }

  // noinspection TsLint
  public getParentOf(id: string): Observable<ContentfulNodePage[]> {
    return new Observable((observer: any) => {
      observer.next([TestContentfulNodePage]);
    });
  }

  public getOverviewPages(): Observable<ContentfulNodePage[]> {
    return new Observable((observer: any) => {
      observer.next([TestContentfulNodePage]);
    });
  }

  // noinspection TsLint
  public getAboutPage(slug: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next({
        submenuItems: [{
          slug: 'about-subsection-slug',
          title: 'subsection title'
        }],
        content: TestContentfulNodePage
      });
    });
  }
}

export class TwitterServiceMock {
  public create(): TwitterRequestMock {
    return new TwitterRequestMock();
  }
}

export class TwitterRequestMock {

  // noinspection TsLint
  public author(name: string): TwitterRequestMock {
    return this;
  }

  // noinspection TsLint
  public maxId(maxId: string): TwitterRequestMock {
    return this;
  }

  // noinspection TsLint
  public sinceId(sinceId: string): TwitterRequestMock {
    return this;
  }

  // noinspection TsLint
  public count(count: number): TwitterRequestMock {
    return this;
  }

  public getTweets(): Observable<Array<Tweet>> {
    const twitterUser: TwitterUser = {
      url: '',
      name: '',
      profile_image_url: '',
      followers_count: 0
    };

    const tweet: Tweet = {
      id: 0,
      id_str: '',
      text: '',
      created_at: new Date().toISOString(),
      user: twitterUser
    };

    return new Observable<Array<Tweet>>((observer: any) => {
      observer.next([tweet]);
    });
  }
}

export class RoutesGatewayServiceMock {

  // noinspection TsLint
  public addRoute(path: string, data?: Object): string {
    return 'AYmxvZy9nYXBtaW5kZXItYmxvZy1wb3N0';
  }

  // noinspection TsLint
  public getAnnotations(component: any): Observable<RouteDefinition[]> {
    const annotations: RouteDefinition = {
      path: 'videos',
      name: 'AdmlkZW9z'
    };
    return new Observable((observer: any) => {
      observer.next([annotations]);
    });
  }

  // noinspection TsLint
  public getSlugParent(id: any, cb: any): any {
    return 'blog';
  }

  // noinspection TsLint
  public getRouteName(path: string): string {
    return undefined;
  }

  // noinspection TsLint
  public getRouteDefinitions(component: any): RouteDefinition[] {
    return undefined;
  }

}

@Directive({
  selector: '[gmContentfulSrcId]'
})
export class ContentfulImageDirectiveMock {

  // noinspection TsLint
  @Input()
  private gmContentfulSrcId: string;

  // noinspection TsLint
  @Input()
  private width: string;

  // noinspection TsLint
  @Input()
  private height: string;

  // noinspection TsLint
  @Input()
  private fit: string;

  private element: ElementRef;

  public constructor(@Inject(ElementRef) element: ElementRef) {
    this.element = element;
  }
}
