import {ComponentInstruction, Router} from 'angular2/router';
import {appInjector} from '../../tools/app-injector.tool';
import {PageStructure} from '../../services/page-structure.service';

export interface DynamicContentRouteParams {
  contentType?: string;
}

export interface DynamicContentDetailRouteParams {
  contentSlug?: string;
}

export function checkContentType(next: ComponentInstruction) {
  let injector = appInjector();
  let pageStructure: PageStructure = injector.get(PageStructure);
  let router: Router = injector.get(Router);
  if (pageStructure.hasSectionType((<DynamicContentRouteParams>next.params).contentType)) {
    return true;
  } else {
    router.navigate(['Root']);
    return false;
  }
}
