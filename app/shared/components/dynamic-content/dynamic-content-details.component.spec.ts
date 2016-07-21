import {
  it, addProviders, beforeEach, inject, async, TestComponentBuilder, ComponentFixture
} from '@angular/core/testing';
import {DynamicContentDetailsComponent} from './dynamic-content-details.component';
import {getBaseTestProviders} from '../../tools/tests.tools';

describe('Component: Dynamic Content Details', () => {

  beforeEach(() => addProviders([
    ...getBaseTestProviders(),
    DynamicContentDetailsComponent
  ]));
  xdescribe('View', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => addProviders([
      TestComponentBuilder
    ]));

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(DynamicContentDetailsComponent)
        .then((f: ComponentFixture<any>) => fixture = f);
    })));

    xit('should have proper amount of dynamic items', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.dynamic-list').length).toBe(1);
      done();
    });
    xit('should have small description video', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.post-p').length).toBe(1);
      done();
    });
  });

  xdescribe('Component', () => {
    let component: DynamicContentDetailsComponent;

    beforeEach(inject([DynamicContentDetailsComponent], (_component: DynamicContentDetailsComponent) => {
      component = _component;
    }));

    it('should have DynamicContentDetailsComponent', () => {
      console.log(component, 'DynamicContentDetailsComponent');

      // expect(component);
    });
  });
});