import { ModuleWithProviders } from '@angular/core';
import { CanActivate, Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MainGuard } from './main.guard';

const routes: Routes = [
  {
    path: '**',
    canActivate: [MainGuard],
    component: MainComponent,
  },
];

export const MainRoutesModule: ModuleWithProviders = RouterModule.forChild(routes);
