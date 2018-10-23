import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {
  ApiService, AppStateService, CryptoService, IconService, UtilsService,
} from 'app/services';

import { AppComponent } from './app.component';
import {
  PwAlertComponent, PwButtonComponent, PwCredentialComponent, PwFlashComponent, PwIconComponent,
  PwInputComponent, PwLoginComponent, PwPasswordFormComponent, PwPasswordKeyComponent,
  PwPasswordListComponent, PwViewOutletComponent,
} from 'app/components';
import { PwFlashDirective } from 'app/directives';

@NgModule({
  declarations: [
    AppComponent,
    PwAlertComponent,
    PwButtonComponent,
    PwCredentialComponent,
    PwFlashComponent,
    PwFlashDirective,
    PwIconComponent,
    PwInputComponent,
    PwLoginComponent,
    PwPasswordFormComponent,
    PwPasswordKeyComponent,
    PwPasswordListComponent,
    PwViewOutletComponent,
  ],
  entryComponents: [PwFlashComponent],
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
    UtilsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
