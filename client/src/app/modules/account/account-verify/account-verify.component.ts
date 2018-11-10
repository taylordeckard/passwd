import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertProps } from 'app/interfaces';
import { AlertColor } from 'app/enums';
import { ApiService } from 'app/services';

@Component({
  selector: 'pw-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.scss'],
})
export class AccountVerifyComponent implements OnInit {
  alert: AlertProps = {
    show: false,
    color: AlertColor.DANGER,
    msg: '',
  };
  constructor (
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit () {
    const token = this.route.snapshot.params.token;
    this.api.createUser(token)
      .pipe(catchError(error => {
        this.alert.show = true;
        if (error.status === 404) {
          this.alert.msg = 'The provided verification token is no longer valid';
        } else {
          this.alert.msg = 'An error occurred. Please try again in a few minutes.';
        }
        return of();
      }))
      .subscribe();
  }
}
