import {Injectable, Type} from "angular2/core";
import {RouteRegistry} from "angular2/router";
import * as _ from 'lodash/index';

import getMetadata = Reflect.getMetadata;
import defineMetadata = Reflect.defineMetadata;

@Injectable()
export default class DynamicRouteConfigurator {
  constructor(private registry: RouteRegistry) {}
  addRoute(component: Type, route) {
    let routeConfig = this.getRoutes(component);
    routeConfig.configs.push(route);
    this.updateRouteConfig(component, routeConfig);
    this.registry.config(component, route);
  }
  removeRoute() {
    // need to touch private APIs - bad
  }
  getRoutes(component: Type) {
    return getMetadata('annotations', component)
      .filter(a => {
        return a.constructor.name === 'RouteConfig';
      }).pop();
  }

  containsRoute(component: Type, path: string) {
    const routes: any = this.getRoutes(component);
    console.log(routes);
    const result = _.find(routes.configs, (route:any) => {
      return route.path === path;
    });

    return !!result;
  }

  updateRouteConfig(component: Type, routeConfig) {
    let annotations = getMetadata('annotations', component);
    let routeConfigIndex = -1;
    for (let i = 0; i < annotations.length; i += 1) {
      if (annotations[i].constructor.name === 'RouteConfig') {
        routeConfigIndex = i;
        break;
      }
    }
    if (routeConfigIndex < 0) {
      throw new Error('No route metadata attached to the component');
    }
    annotations[routeConfigIndex] = routeConfig;
    defineMetadata('annotations', annotations, component);
  }
}
