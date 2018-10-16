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
export class AppComponent implements OnDestroy, OnInit {
  isLoggedIn: boolean;
  isLoggedInSub: Subscription;
  title = 'passwd';
  user: User;
  constructor (
    private api: ApiService,
    private crypto: CryptoService,
    private state: AppStateService,
  ) {}
  ngOnDestroy ()  {
    if (this.isLoggedInSub) {
      this.isLoggedInSub.unsubscribe();
    }
  }
  ngOnInit () {
    this.isLoggedInSub = this.api.loggedInSubject.subscribe(change => {
      if (change && this.isLoggedIn !== change) {
        this.api.getUser()
          .subscribe(response => {
            this.user = response;
            this.state.user = this.user;
            if (this.state.passwords.length === 0) {
              this.state.view = PwListView.KEY;
            }
          });
      }
      this.isLoggedIn = change;
    });
  }
}
