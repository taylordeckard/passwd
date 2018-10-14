import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ApiService, CryptoService, IconService, AppStateService } from 'app/services';

import { AppComponent } from './app.component';
import {
  PwAlertComponent, PwButtonComponent, PwCredentialComponent, PwIconComponent,
  PwInputComponent, PwLoginComponent, PwPasswordFormComponent, PwPasswordKeyComponent,
  PwPasswordListComponent, PwViewOutletComponent,
} from 'app/components';

@NgModule({
  declarations: [
    AppComponent,
    PwAlertComponent,
    PwButtonComponent,
    PwCredentialComponent,
    PwIconComponent,
    PwInputComponent,
    PwLoginComponent,
    PwPasswordFormComponent,
    PwPasswordKeyComponent,
    PwPasswordListComponent,
    PwViewOutletComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ApiService,
    AppStateService,
    CryptoService,
    IconService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
