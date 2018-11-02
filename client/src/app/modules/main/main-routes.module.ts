import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '**', component: MainComponent },
];

export const MainRoutesModule: ModuleWithProviders = RouterModule.forChild(routes);
