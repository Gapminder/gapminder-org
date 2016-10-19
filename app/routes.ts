import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TagComponent, RoutesGatewayGuard, ProfileComponent, RoutesGatewayComponent } from 'ng2-contentful-blog';
import { DynamicContentDetailsComponent } from './shared/components/dynamic-content/dynamic-content-details.component';

export const routes: Routes = [
  {path: '', component: DynamicContentDetailsComponent},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'profile/:userName', component: ProfileComponent},
  {path: '**', component: RoutesGatewayComponent, canActivate: [RoutesGatewayGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
