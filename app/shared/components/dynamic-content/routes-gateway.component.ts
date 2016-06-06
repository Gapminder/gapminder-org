import {Component} from '@angular/core';
import {CanActivate, ComponentInstruction, Router} from '@angular/router-deprecated';
import {appInjector} from '../../tools/app-injector.tool.ts';
import {RoutesGatewayService} from '../../services/routes-gateway.service';
import {ContenfulContent} from '../../services/contentful-content.service';
import {NodePageContent} from '../../structures/content-type.structures';
import {ContentfulNodePage} from '../../structures/aliases.structures';

import * as _ from 'lodash';

@Component({})
@CanActivate(checkRoute)
export default class RoutesGatewayComponent {
}

function checkRoute(next: ComponentInstruction): boolean {
  const injector = appInjector();
  const router: Router = injector.get(Router);
  const routesGatewayService: RoutesGatewayService = injector.get(RoutesGatewayService);
  const contentfulContent: ContenfulContent = injector.get(ContenfulContent);

  const paths: string[] = next.urlPath.split('/');
  const firstPath: string = _.first(paths);
  const lastPath: string = _.last(paths);

  parentOf(lastPath, paths, new Map<string, string>());
  return false;

  function parentOf(lastSlug: string, slugs: string[], titles: Map<string, string>): void {
    if (!slugs.length) {
      registerRoutes(collectAllPossiblePaths(slugs), titles);
      return;
    }

    contentfulContent
      .getNodePage(lastSlug)
      .subscribe(
        (contentfulNodePage: ContentfulNodePage[]) => {
          if (!_.isEmpty(contentfulNodePage)) {
            let nodePageContent: NodePageContent = _.first(contentfulNodePage).fields;
            titles.set(nodePageContent.slug, nodePageContent.title);
            if (nodePageContent.parent) {
              if (nodePageContent.slug === firstPath) {
                router.navigate(['Root']);
                return;
              }
              return parentOf(nodePageContent.parent.fields.slug, slugs, titles);

            } else if (!nodePageContent.parent && nodePageContent.slug === firstPath) {
              registerRoutes(collectAllPossiblePaths(slugs), titles);
              return;

            } else {
              router.navigate(['Root']);
              return;
            }

          }
          if (_.isEmpty(contentfulNodePage) || _.first(contentfulNodePage).fields.slug !== slugs.pop()) {
            router.navigate(['Root']);
            return;
          }
        });
  }

  function collectAllPossiblePaths(pathFragments: string[]): string[] {
    const collectedPaths: string[] = [];
    collectedPaths.push(_.first(pathFragments));
    pathFragments.reduce(function (a: string, b: string): string {
      collectedPaths.push(`${a}/${b}`);
      return `${a}/${b}`;
    });
    return collectedPaths;
  }

  function registerRoutes(allPossiblePaths: string[], titles: Map<string, string>): any {
    _.forEach(allPossiblePaths, (path: string) => {

      let currentTitle = path.split('/').pop();
      routesGatewayService.addRoute(path, {name: titles.get(currentTitle)});
    });
    const lastPossiblePath = _.last(allPossiblePaths);
    const name = routesGatewayService.getRouteName(lastPossiblePath);
    router.navigate([name]);
  }
}

