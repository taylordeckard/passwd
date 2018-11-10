import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { AccountRoutesModule } from './account-routes.module';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountVerifyComponent } from './account-verify/account-verify.component';
import { PwAccountCreateFormComponent } from './account-create-form/account-create-form.component';
import { PwAccountResetInitComponent } from './account-reset-init/pw-account-reset-init.component';
import { PwAccountResetApplyComponent } from './account-reset-apply/pw-account-reset-apply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountCreateComponent,
    AccountVerifyComponent,
    PwAccountCreateFormComponent,
    PwAccountResetApplyComponent,
    PwAccountResetInitComponent,
  ],
  imports: [
    AccountRoutesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
})
export class AccountModule { }
