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

    // This is almost the same as in the LatestPostComponent, should be moved to some common class
    it('should be able to convert string to the date object', () => {
      expect((<any>component).toDate instanceof Function).toBeTruthy();
      expect((<any>component).toDate('2016-02-29T14:26:46.815Z') instanceof Date).toBeTruthy();
      expect((<any>component).toDate('')).toBe(undefined);
      expect((<any>component).toDate(undefined)).toBe(undefined);
    });
  });
});
