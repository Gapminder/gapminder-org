import {ComponentInstruction, Router} from 'angular2/router';
import {appInjector} from '../../tools/app-injector.tool';
import {PageStructure} from '../../services/page-structure.service';

export function checkContentType(next: ComponentInstruction) {
  let injector = appInjector();
  let pageStructure: PageStructure = injector.get(PageStructure);
  let router: Router = injector.get(Router);
  /* tslint:disable:no-string-literal */
  if (pageStructure.hasSectionType(next.params['contentType'])) {
    /* tslint:enable:no-string-literal */
    return true;
  } else {
    router.navigate(['Root']);
    return false;
  }
}
