import {
  it,
  beforeEachProviders,
  injectAsync,
  TestComponentBuilder,
  ComponentFixture
} from 'angular2/testing';

import {Root} from './root.component';
import {getBaseTestProviders} from '../../shared/tools/tests.tools';


describe('Root', () => {
  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    Root
  ]);

  it('should have all subsections', injectAsync([TestComponentBuilder],
    (tcb: TestComponentBuilder) => {
      return tcb.createAsync(Root).then(
        (componentFixture: ComponentFixture) => {
          const element = componentFixture.nativeElement;
          componentFixture.detectChanges();
          expect(element.querySelectorAll('gapminder-overview').length).toBe(1);
          expect(element.querySelectorAll('latest-posts').length).toBe(1);
          expect(element.querySelectorAll('latest-videos').length).toBe(1);
          expect(element.querySelectorAll('tweets').length).toBe(1);
        }
      );
    }));
});
