import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ApiService } from './api.service';
import { IconService } from './icon.service';

import { AppComponent } from './app.component';
import { PwAlertComponent } from './alert/pw-alert.component';
import { PwButtonComponent } from './button/pw-button.component';
import { PwCredentialComponent } from './credential/pw-credential.component';
import { PwIconComponent } from './icon/pw-icon.component';
import { PwLoginComponent } from './login/pw-login.component';
import { PwPasswordListComponent } from './password-list/pw-password-list.component';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    PwAlertComponent,
    PwButtonComponent,
    PwCredentialComponent,
    PwIconComponent,
    PwLoginComponent,
    PwPasswordListComponent,
    TextInputComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiService, IconService],
  bootstrap: [AppComponent]
})
export class AppModule { }
