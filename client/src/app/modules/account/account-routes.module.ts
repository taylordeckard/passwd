import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountVerifyComponent } from './account-verify/account-verify.component';
import { PwAccountResetInitComponent } from './account-reset-init/pw-account-reset-init.component';
import { PwAccountResetApplyComponent } from './account-reset-apply/pw-account-reset-apply.component';

const routes: Routes = [
  { path: 'create', component: AccountCreateComponent },
  { path: 'reset/init', component: PwAccountResetInitComponent },
  { path: 'reset/:token', component: PwAccountResetApplyComponent },
  { path: 'verify/:token', component: AccountVerifyComponent },
  { path: '**', redirectTo: 'create' },
];

export const AccountRoutesModule: ModuleWithProviders = RouterModule.forChild(routes);
