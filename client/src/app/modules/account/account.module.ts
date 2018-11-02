import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { AccountRoutesModule } from './account-routes.module';
import { AccountCreateComponent } from './account-create/account-create.component';
import { PwAccountCreateFormComponent } from './account-create-form/account-create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountCreateComponent,
    PwAccountCreateFormComponent,
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
