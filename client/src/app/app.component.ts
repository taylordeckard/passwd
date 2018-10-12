import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Credentials, User } from 'app/interfaces';

import { ApiService } from 'app/services';

@Component({
  selector: 'pw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'passwd';
  isLoggedIn: boolean;
  isLoggedInSub: Subscription;
  user: User;
  constructor (private api: ApiService) {}
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
          });
      }
      this.isLoggedIn = change;
    });
  }
  onPasswordsChange (passwords: Credentials[]) {
    this.api.updateUser(this.user)
    .pipe(catchError(err => {
      return of();
    }))
    .subscribe(result => {
      console.log(result);
    });
  }
}
