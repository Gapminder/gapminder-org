import {ComponentInstruction, Router} from 'angular2/router';
import {appInjector} from '../../tools/app-injector.tool';
import {PageStructure} from '../../services/page-structure.service';
import {StringWrapper} from 'angular2/src/facade/lang';

const _cssSelectorRe: RegExp = /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/gmi;

export interface DynamicContentRouteParams {
  contentType?: string;
}

export interface DynamicContentRouteData {
  customCss?: string;
}

export interface DynamicContentDetailRouteParams {
  contentSlug?: string;
}

export function checkContentType(next: ComponentInstruction) {
  let injector = appInjector();
  let pageStructure: PageStructure = injector.get(PageStructure);
  let router: Router = injector.get(Router);
  let sectionType = pageStructure
    .getSectionType((<DynamicContentRouteParams>next.params).contentType);
  if (sectionType) {
    (<DynamicContentRouteData> next['routeData'].data).customCss = sectionType.customCss;
    return true;
  } else {
    router.navigate(['Root']);
    return false;
  }
}

export function encapsulateCss(css: string, prefix: string): string {
  return StringWrapper.replaceAllMapped(css, _cssSelectorRe, function(m) {
    var rule = m[0];
    return `${prefix} ${rule}`;
  });
}
