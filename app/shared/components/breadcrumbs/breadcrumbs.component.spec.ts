import {
  it, beforeEachProviders, beforeEach, inject, injectAsync
} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';

import {BreadcrumbsComponent} from './breadcrumbs.component';
import {getBaseTestProviders} from '../../tools/tests.tools';
import {AppComponent} from '../../../app.component';

describe('Component: Breadcrumbs', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    AppComponent,
    BreadcrumbsComponent
  ]);

  xdescribe('View', () => {
    let fixture: ComponentFixture<any>;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(BreadcrumbsComponent)
        .then((f: ComponentFixture<any>) => fixture = f);
    }));

    it('should have breadcrumbs list', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.breadcrumbs').length).toBe(1);
      done();
    });
    it('should have breadcrumbs list and items', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.breadcrumbs > li').length).toBe(1);
      done();
    });
  });

  describe('Component', () => {
    let component: BreadcrumbsComponent;

    beforeEach(inject([BreadcrumbsComponent], (_component: BreadcrumbsComponent) => {
      component = _component;
    }));

    it('should have default type - Breadcrumbs Component', () => {
      expect(component.type).toEqual('Breadcrumbs Component');
    });
  });
});
