import {Injectable, Inject} from '@angular/core';
import DynamicRouteConfigurator from './dynamic-route-configurator.service';
import {DynamicContentDetailsComponent} from '../components/dynamic-content/dynamic-content-details.component';
import * as Reflect from 'es7-reflect-metadata';
import {RouteDefinition} from '@angular/router-deprecated';
import {ContenfulContent} from './contentful-content.service';

import * as _ from 'lodash';

@Injectable()
export class RoutesGatewayService {
  private pathToName: Map<string, string>;
  private constructorOfRouterComponentInstance: any;
  private routeConfigurator: DynamicRouteConfigurator;
  private contentfulContentService: ContenfulContent;

  public constructor(@Inject(DynamicRouteConfigurator) routeConfigurator: DynamicRouteConfigurator,
                     @Inject(ContenfulContent) contentfulContentService: ContenfulContent) {
    this.contentfulContentService = contentfulContentService;
    this.routeConfigurator = routeConfigurator;
    this.pathToName = new Map<string, string>();
  }

  public setConstructorOfRouterComponentInstance(instanceConstructor: any): void {
    this.constructorOfRouterComponentInstance = instanceConstructor;
  }

  public getRouteName(path: string): string {
    return this.pathToName.get(path);
  }

  public addRoute(path: string, data?: any): string {
    const doesRouteExist: boolean = this.routeConfigurator.containsRoute(this.constructorOfRouterComponentInstance, path);
    const name = `A${window.btoa(path)}`;
    if (!doesRouteExist) {
      this.routeConfigurator.addRoute(this.constructorOfRouterComponentInstance, {
        path: path,
        name: name,
        component: DynamicContentDetailsComponent,
        data: data
      });

      this.pathToName.set(path, name);
      return name;
    }
    return name;
  }

  public getRouteDefinitions(component: any): RouteDefinition[] {
    let annotations = Reflect.getOwnMetadata('annotations', component);
    let routeConfig = _.find(annotations, (annotation: any) => annotation.constructor.name === 'RouteConfig');
    return routeConfig ? routeConfig.configs : undefined;
  }

  public getSlugParent(id: string, cb: any): any {
    this.contentfulContentService
      .getParentOf(id)
      .subscribe(
        (res: any) => {
          let slug = res[0].fields.slug;
          if (!res[0].fields.parent) {
            return cb(slug);
          }
          let parentId = res[0].fields.parent.sys.id;
          this.getSlugParent(parentId, (parentUrl: string) => {
            return cb(parentUrl + '/' + slug);
          });
        });
  }
}
