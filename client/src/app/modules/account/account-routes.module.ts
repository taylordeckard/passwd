import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountVerifyComponent } from './account-verify/account-verify.component';

const routes: Routes = [
  { path: 'create', component: AccountCreateComponent },
  { path: 'verify/:token', component: AccountVerifyComponent },
  { path: '**', redirectTo: 'create' },
];

export const AccountRoutesModule: ModuleWithProviders = RouterModule.forChild(routes);
