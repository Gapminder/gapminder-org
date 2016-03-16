import {LatestVideosComponent} from './latest-videos.component';
import {it, beforeEachProviders, TestComponentBuilder, ComponentFixture, injectAsync} from 'angular2/testing';
import {getBaseTestProviders} from '../../../../shared/tools/tests.tools';

describe('Component: Latest Videos', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    LatestVideosComponent
  ]);

  it('should have proper amount of videos items', injectAsync([TestComponentBuilder],
    (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(LatestVideosComponent)
        .then(
          (fixture: ComponentFixture) => {
            fixture.detectChanges();
            const element = fixture.nativeElement;
            expect(element.querySelectorAll('video-item').length).toBe(0);
          }
        );
    }));
});
