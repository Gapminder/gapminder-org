import {
  it, beforeEachProviders, beforeEach, TestComponentBuilder, ComponentFixture, injectAsync, inject
} from 'angular2/testing';
import {LatestVideosComponent} from './latest-videos.component';
import {getBaseTestProviders} from '../../../../shared/tools/tests.tools';

describe('Component: Latest Videos', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    LatestVideosComponent
  ]);

  describe('View', () => {
    let fixture: ComponentFixture;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(LatestVideosComponent)
        .then(f => fixture = f);
    }));

    it('should have proper amount of videos items', done => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.video-item').length).toBe(1);
      done();
    });
  });

  describe('Component', () => {
    let component: LatestVideosComponent;

    beforeEach(inject([LatestVideosComponent], (_component: LatestVideosComponent) => {
      component = _component;
    }));

    it('should have default limit value equal to 3', () => {
      expect((<any>component).limit).toBe(3);
    });
  });
});
