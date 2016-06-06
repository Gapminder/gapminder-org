import {
  it, beforeEachProviders, beforeEach, injectAsync, inject
} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';

import {LatestVideosComponent} from './latest-videos.component';
import {getBaseTestProviders} from '../../../../shared/tools/tests.tools';

describe('Component: Latest Videos', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    LatestVideosComponent
  ]);

  describe('View', () => {
    let fixture: ComponentFixture<any>;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(LatestVideosComponent)
        .then((f: ComponentFixture<any>) => fixture = f);
    }));

    it('should have proper amount of videos items', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.video-item').length).toBe(1);
      done();
    });
    it('should have small description video', (done: () => void) => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.querySelectorAll('.post-p').length).toBe(1);
      done();
    });
  });

  describe('Component', () => {
    let component: LatestVideosComponent;

    beforeEach(inject([LatestVideosComponent], (_component: LatestVideosComponent) => {
      component = _component;
    }));

    it('should have default limit value equal to 3', () => {
      expect((component as any).limit).toBe(3);
    });
  });
});
