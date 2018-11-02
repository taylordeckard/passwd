import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreateComponent } from './account-create/account-create.component';

const routes: Routes = [
  {
    path: 'create',
    component: AccountCreateComponent,
  },
  { path: '**', redirectTo: 'create' },
];

export const AccountRoutesModule: ModuleWithProviders = RouterModule.forChild(routes);
