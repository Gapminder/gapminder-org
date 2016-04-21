import {Component} from "angular2/core";
import {CanActivate, ComponentInstruction, Router} from "angular2/router";
import {appInjector} from "./shared/tools/app-injector.tool";
import DynamicRouteConfigurator from "./dynamic-route-configurator.service";
import RoutesGatewayService from "../routes-gateway.service";
import {DynamicComponentDetails} from "./shared/components/dynamic-content/dynamic-content-details.component";

@Component({})
@CanActivate(checkRoute)
export default class RoutesGateway {
}

function checkRoute(next: ComponentInstruction, prev: ComponentInstruction) {
  let injector = appInjector();
  let router: Router = injector.get(Router);
  let routeConfigurator: DynamicRouteConfigurator = injector.get(DynamicRouteConfigurator);
  let routesGatewayService: RoutesGatewayService = injector.get(RoutesGatewayService);


  const doesRouteExist: boolean = routeConfigurator.containsRoute(routesGatewayService.rootConstructor, next.urlPath);
  console.log(doesRouteExist);

    
  if (!doesRouteExist) {
    //TODO: check that route exists on contentful (all slugs in chain - recursion?)
    const name = `A${window.btoa(next.urlPath)}`;
    routeConfigurator.addRoute(routesGatewayService.rootConstructor, {path: next.urlPath, name: name, component: DynamicComponentDetails});
    console.log(`registered route with the name: ${name}`);
    router.navigate([name]);
    return false;
  }

  router.navigate(['Root']);
  return false;
}
