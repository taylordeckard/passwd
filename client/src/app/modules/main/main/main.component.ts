import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PwListView } from 'app/enums';
import { User } from 'app/interfaces';
import { ApiService, AppStateService, CryptoService } from 'app/services';

@Component({
  selector: 'pw-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy, OnInit {
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
