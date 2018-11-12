import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ApiService, AppStateService } from 'app/services';
import { AlertColor, KeyCode, PwListView, } from 'app/enums';
import { AlertProps } from 'app/interfaces';
import { fade } from 'app/animations';

@Component({
  selector: 'pw-login',
  templateUrl: './pw-login.component.html',
  styleUrls: ['./pw-login.component.scss'],
  animations: [...fade],
})
export class PwLoginComponent implements OnDestroy {
  alert: AlertProps = { show: false, msg: '', color: AlertColor.DANGER };
  loginPostSub: Subscription;
  constructor (
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private state: AppStateService,
  ) {}
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  onSubmit () {
    this.loginPostSub = this.api.login(this.loginForm.value)
      .pipe(catchError((err: any) => {
        this.showAlert('That didn\'t work.', AlertColor.DANGER);
        return of();
      }))
      // login then get user
      .pipe(flatMap(() => this.api.getUser()))
      .subscribe(user => {
        this.state.user = user;
        if (this.state.passwords.length === 0) {
          this.state.view = PwListView.KEY;
        }
        this.router.navigate(['']);
      });
  }
  ngOnDestroy () {
    if (this.loginPostSub) {
      this.loginPostSub.unsubscribe();
    }
  }
  showAlert (msg: string, color: AlertColor) {
    this.alert.msg = msg;
    this.alert.show = true;
    this.alert.color = color;
  }
  onKeypress (event: KeyboardEvent) {
    event.stopPropagation();
    if (event.key === KeyCode.ENTER) {
      this.onSubmit();
    }
  }
}
