import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './sections/root/root.component';
import { ModuleWithProviders } from '@angular/core';
import { TagComponent, RoutesGatewayGuard, ProfileComponent, RoutesGatewayComponent } from 'ng2-contentful-blog';

export const routes: Routes = [
  {path: '', component: RootComponent},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'profile/:userName', component: ProfileComponent},
  {path: '**', component: RoutesGatewayComponent, canActivate: [RoutesGatewayGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
