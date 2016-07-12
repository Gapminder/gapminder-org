import {
  it,
  addProviders,
  beforeEach,
  inject,
  TestComponentBuilder, ComponentFixture
} from '@angular/core/testing';
import {RootComponent} from './root.component';
import {getBaseTestProviders} from '../../shared/tools/tests.tools';

describe('Component: Root', () => {

  beforeEach(() => addProviders([
    ...getBaseTestProviders(),
    RootComponent
  ]));

  describe('View', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => addProviders([
      TestComponentBuilder
    ]));

    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      fixture = tcb.createSync(RootComponent);
    }));

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
