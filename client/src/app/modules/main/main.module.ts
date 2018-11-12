import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PwPasswordFormComponent } from './password-form/pw-password-form.component';
import { PwPasswordKeyComponent } from './password-key/pw-password-key.component';
import { PwPasswordListComponent } from './password-list/pw-password-list.component';
import { PwViewOutletComponent } from './view-outlet/pw-view-outlet.component';
import { SharedModule } from 'app/shared/shared.module';
import { MainRoutesModule } from './main-routes.module';
import { MainComponent } from './main/main.component';
import { MainGuard } from './main.guard';

@NgModule({
  declarations: [
    MainComponent,
    PwPasswordFormComponent,
    PwPasswordKeyComponent,
    PwPasswordListComponent,
    PwViewOutletComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutesModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [MainGuard],
})
export class MainModule { }
