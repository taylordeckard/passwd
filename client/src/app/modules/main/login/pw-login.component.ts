import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from 'app/services';
import { AlertColor, KeyCode } from 'app/enums';
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
      .subscribe(response => {
        this.showAlert('Logged In!', AlertColor.SUCCESS);
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
