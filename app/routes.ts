import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './sections/root/root.component';
import { ModuleWithProviders } from '@angular/core';
import { TagComponent } from 'ng2-contentful-blog/components/tags/tag.component';
import { RoutesGatewayGuard } from 'ng2-contentful-blog/components/routes-gateway/routes-gateway.guard';
import { ProfileComponent } from 'ng2-contentful-blog/components/profile/profile.component';
import { RoutesGatewayComponent } from 'ng2-contentful-blog/components/routes-gateway/routes-gateway.component';

export const routes: Routes = [
  {path: '', component: RootComponent},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'profile/:userName', component: ProfileComponent},
  {path: '**', component: RoutesGatewayComponent, canActivate: [RoutesGatewayGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
