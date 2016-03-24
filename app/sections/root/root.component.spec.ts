import {
  it,
  beforeEachProviders,
  beforeEach,
  injectAsync,
  TestComponentBuilder,
  ComponentFixture
} from 'angular2/testing';

import {Root} from './root.component';
import {getBaseTestProviders} from '../../shared/tools/tests.tools';


describe('Component: Root', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    Root
  ]);

  describe('View', () => {
    let fixture: ComponentFixture;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(Root)
        .then(f => fixture = f);
    }));

    it('should have all subsections', done => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('gapminder-overview').length).toBe(1);
      expect(element.querySelectorAll('latest-posts').length).toBe(1);
      expect(element.querySelectorAll('latest-videos').length).toBe(1);
      expect(element.querySelectorAll('tweets').length).toBe(1);
      done();
    });
  });
});
