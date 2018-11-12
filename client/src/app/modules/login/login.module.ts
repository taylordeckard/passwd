import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutesModule } from './login-routes.module';
import { PwLoginComponent } from './pw-login.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    PwLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutesModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
})
export class LoginModule { }
