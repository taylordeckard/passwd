import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ApiService, IconService } from 'app/services';

import { AppComponent } from './app.component';
import { PwAlertComponent } from 'app/components';
import { PwButtonComponent } from 'app/components';
import { PwCredentialComponent } from 'app/components';
import { PwIconComponent } from 'app/components';
import { PwLoginComponent } from 'app/components';
import { PwPasswordListComponent } from 'app/components';
import { TextInputComponent } from 'app/components';

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
