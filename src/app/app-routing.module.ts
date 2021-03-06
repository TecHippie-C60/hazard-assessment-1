import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinComponent } from './component/pin/pin.component';
import { AdminComponent } from './component/admin/admin.component';
import { LayoutComponent } from './component/layout/layout.component';

import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [{
  path: '',
  redirectTo: '/', 
  pathMatch: 'full'
}, {  
  path: '',
  component: LayoutComponent 
}, {  
  path: 'pin',
  component: PinComponent 
}, {  
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }