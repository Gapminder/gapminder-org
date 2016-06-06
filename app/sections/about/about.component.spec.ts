import {getBaseTestProviders} from '../../shared/tools/tests.tools';
import {AboutComponent} from './about.component';
import {beforeEachProviders, beforeEach, injectAsync} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';

import {RouteData, RouteParams} from '@angular/router-deprecated';
import {provide} from '@angular/core';

class RouteDateAndParamsMock {
  // noinspection TsLint
  public get(key: string): any {
    return 'test-slug';
  }
}

describe('Component: AboutComponent', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    provide(RouteData, {useClass: RouteDateAndParamsMock}),
    provide(RouteParams, {useClass: RouteDateAndParamsMock}),
    AboutComponent
  ]);

  describe('View', () => {
    let fixture: ComponentFixture<any>;
    let element: Element;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(AboutComponent)
        .then((f: ComponentFixture<any>) => {
          fixture = f;
          fixture.detectChanges();
          element = fixture.nativeElement;
        });
    }));
  });
});
