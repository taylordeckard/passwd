import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Credentials, User } from 'app/interfaces';

import { ApiService, CryptoService, AppStateService } from 'app/services';
import { PwListView } from 'app/enums';

@Component({
  selector: 'pw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
