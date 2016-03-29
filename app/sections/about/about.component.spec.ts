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

    // it('should show subsection section', () => {
    //   expect(element.querySelectorAll('#about-help-nav a').length).toBe(1);
    // });
    //
    // it('should have proper subsection title', () => {
    //   // test subsection title defined in ContenfulContentMock
    //   expect(element.querySelector('#about-help-nav span').textContent.trim())
    //     .toBe('subsection title');
    // });
    //
    // it('should have proper section title', () => {
    //   expect(element.querySelector('h1').textContent.trim())
    //     .toBe(TestContentfulNodePage.fields.title);
    // });

    // TODO - add content test
  });
});
