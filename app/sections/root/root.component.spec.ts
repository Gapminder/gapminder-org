import {
  it,
  beforeEachProviders,
  beforeEach,
  inject,
  async
} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {RootComponent} from './root.component';
import {getBaseTestProviders} from '../../shared/tools/tests.tools';

xdescribe('Component: Root', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    RootComponent
  ]);

  describe('View', () => {
    let fixture: ComponentFixture<any>;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(RootComponent)
        .then((f: ComponentFixture<any>) => fixture = f);
    })));

    it('should have all subsections', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('gm-gapminder-overview').length).toBe(1);
      expect(element.querySelectorAll('gm-latest-posts').length).toBe(1);
      expect(element.querySelectorAll('gm-latest-videos').length).toBe(1);
      expect(element.querySelectorAll('gm-tweets').length).toBe(1);
      done();
    });
  });
});
