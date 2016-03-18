
import {
  it, beforeEachProviders, beforeEach, TestComponentBuilder, ComponentFixture, injectAsync, inject
} from 'angular2/testing';
import {getBaseTestProviders, TestContentfulNodePage} from '../../../../shared/tools/tests.tools';
import {GapminderOverviewComponent} from './gapminder-overview.component';

describe('Component: Gapminder Overview', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    GapminderOverviewComponent
  ]);

  describe('View', () => {
    let fixture: ComponentFixture;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(GapminderOverviewComponent)
        .then(f => fixture = f);
    }));

    it('should have proper slide title', done => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelector('.title').textContent).toBe(
        TestContentfulNodePage.fields.title
      );
      done();
    });

    it('should have proper slide description', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelector('.block-description > p').textContent).toBe(
        TestContentfulNodePage.fields.description
      );
    });

    it('should have the read more link ', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.block-description a.more-info').length).toBe(1);
    });

  });
});
