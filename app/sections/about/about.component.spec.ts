import {getBaseTestProviders} from '../../shared/tools/tests.tools';
import {AboutComponent} from './about.component';
import {beforeEachProviders, beforeEach, inject, async} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';

import {RouteData, RouteParams} from '@angular/router-deprecated';
import {provide} from '@angular/core';

class RouteDateAndParamsMock {
  /* tslint:disable:no-unused-variable */
  public get(key: string): any {
    return 'test-slug';
  }
  /* tslint:enable:no-unused-variable */

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

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(AboutComponent)
        .then((f: ComponentFixture<any>) => {
          fixture = f;
          fixture.detectChanges();
          element = fixture.nativeElement;
        });
    })));
  });
});
