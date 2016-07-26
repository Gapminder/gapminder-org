import { provideRouter, RouterConfig } from '@angular/router';
import { RoutesGatewayGuard, RoutesGatewayComponent, TagComponent, ProfileComponent } from 'ng2-contentful-blog';
import { RootComponent } from './sections/root/root.component';

export const appRoutes: RouterConfig = [
  {path: '', component: RootComponent},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'profile/:userName', component: ProfileComponent},
  {path: '**', component: RoutesGatewayComponent, canActivate: [RoutesGatewayGuard]}
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
