import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PwAlertComponent,
  PwButtonComponent,
  PwConfirmModalComponent,
  PwCredentialComponent,
  PwFlashComponent,
  PwIconComponent,
  PwInputComponent,
} from 'app/components';
import { PwFlashDirective } from 'app/directives';

@NgModule({
  declarations: [
    PwAlertComponent,
    PwButtonComponent,
    PwConfirmModalComponent,
    PwCredentialComponent,
    PwFlashComponent,
    PwFlashDirective,
    PwIconComponent,
    PwInputComponent,
  ],
  entryComponents: [PwFlashComponent],
  exports: [
    PwAlertComponent,
    PwButtonComponent,
    PwConfirmModalComponent,
    PwCredentialComponent,
    PwFlashComponent,
    PwFlashDirective,
    PwIconComponent,
    PwInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class SharedModule { }
