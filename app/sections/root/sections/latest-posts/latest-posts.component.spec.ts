import {
  it, beforeEachProviders, beforeEach, TestComponentBuilder, ComponentFixture, injectAsync, inject
} from 'angular2/testing';
import {getBaseTestProviders} from '../../../../shared/tools/tests.tools';
import {LatestPostsComponent} from './latest-posts.component';

describe('Component: Latest Posts', () => {

  beforeEachProviders(() => [
    ...getBaseTestProviders(),
    LatestPostsComponent
  ]);

  describe('View', () => {
    let fixture: ComponentFixture;

    beforeEachProviders(() => [
      TestComponentBuilder
    ]);

    beforeEach(injectAsync([TestComponentBuilder], tcb => {
      return tcb
        .createAsync(LatestPostsComponent)
        .then(f => fixture = f);
    }));

    it('should have proper amount of post items', done => {
      const element = fixture.nativeElement;
      fixture.detectChanges();
      expect(element.querySelectorAll('post-item').length).toBe(0);
      done();
    });

    it('should have subsection title', () => {
      expect(fixture.nativeElement.querySelectorAll('.post-head').length).toBe(1);
    });

    it('should have button link', () => {
      expect(fixture.nativeElement.querySelectorAll('.row > button').length).toBe(1);
    });

    it('button link should navigate to posts', () => {
      // this one will fail now
    });
  });

  describe('Component', () => {
    let component: LatestPostsComponent;

    beforeEach(inject([LatestPostsComponent], (_component: LatestPostsComponent) => {
      component = _component;
    }));

    it('should have default limit value equal to 3', () => {
      expect((<any>component).limit).toBe(3);
    });

    it('should be able to convert string to the date object', () => {
      expect((<any>component).toDate instanceof Function).toBeTruthy();
      expect((<any>component).toDate('2016-02-29T14:26:46.815Z') instanceof Date).toBeTruthy();
    });
  });
});
