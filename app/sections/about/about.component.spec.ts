import {getBaseTestProviders, TestContentfulNodePage} from '../../shared/tools/tests.tools';
import {About} from './about.component';
import {beforeEachProviders, beforeEach, ComponentFixture, TestComponentBuilder, injectAsync} from 'angular2/testing';
import {RouteData, RouteParams} from 'angular2/router';
import {provide} from 'angular2/core';

class RouteDateAndParamsMock {
  get(key: string) {
    return 'test-slug';
  }
}

describe('Component: About', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    provide(RouteData, {useClass: RouteDateAndParamsMock}),
    provide(RouteParams, {useClass: RouteDateAndParamsMock}),
    About
  ]);

  describe('View', () => {
    let fixture: ComponentFixture;
    let element: Element;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(About)
        .then(f => {
          fixture = f;
          fixture.detectChanges();
          element = fixture.nativeElement;
        });
    }));
  });
});
