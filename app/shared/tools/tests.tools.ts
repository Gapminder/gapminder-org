import {PLATFORM_DIRECTIVES, provide, Directive, ElementRef, Input} from 'angular2/core';
import {ContenfulContent} from '../services/contentful-content.service';
import {AppComponent} from '../../app.component';
import {ROUTER_PRIMARY_COMPONENT, Router, RouteRegistry, Location} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {Observable} from 'rxjs/Observable';
import {ContentfulNodePage} from '../structures/aliases.structures';


export function getBaseTestProviders() {
  return [
    provide(PLATFORM_DIRECTIVES, {
      useValue: ContentfulImageDirectiveMock, multi: true
    }),
    provide(ContenfulContent, {
      useClass: ContenfulContentMock
    }),
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useClass: RootRouter}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
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

  getLatestVideo(limit: number): Observable<ContentfulNodePage[]> {
    return new Observable(observer => {
      observer.next([TestContentfulNodePage]);
    });
  }

  getLatestPosts(limit: number): Observable<ContentfulNodePage[]> {
    return new Observable(observer => {
      observer.next([TestContentfulNodePage]);
    });
  }

  getOverviewPages(): Observable<ContentfulNodePage[]> {
    return new Observable(observer => {
      observer.next([TestContentfulNodePage]);
    });
  }

  getAboutPage(slug) {
    return new Observable(observer => {
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

@Directive({
  selector: '[contentful-src-id]',
})
export class ContentfulImageDirectiveMock {
  @Input('contentful-src-id')
  contentfulAssetId: string;
  @Input()
  private width: string;
  @Input()
  private height: string;
  @Input()
  private fit: string;

  constructor(private element: ElementRef) {
  }
}
