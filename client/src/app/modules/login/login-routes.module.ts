import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwLoginComponent } from './pw-login.component';

const routes: Routes = [
  { path: '**', component: PwLoginComponent },
];

export const LoginRoutesModule: ModuleWithProviders = RouterModule.forChild(routes);
