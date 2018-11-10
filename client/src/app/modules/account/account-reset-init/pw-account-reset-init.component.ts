import {
  Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'app/services';
import { AlertColor } from 'app/enums';
import { AlertProps } from 'app/interfaces';

@Component({
  selector: 'pw-account-reset-init',
  templateUrl: './pw-account-reset-init.component.html',
  styleUrls: ['./pw-account-reset-init.component.scss'],
})
export class PwAccountResetInitComponent {
  alert: AlertProps = {
    show: false,
    color: AlertColor.DANGER,
    msg: '',
  };
  emailForm: FormGroup;
  submitted = false;
  constructor (
    private api: ApiService,
    private fb: FormBuilder,
  ) {
    this.emailForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  get email () { return this.emailForm.get('email'); }

  validate(controlType: 'password' | 'repeatPassword') {
    this.emailForm.controls[controlType].updateValueAndValidity();
  }

  onSubmit () {
    const email = this.emailForm.value.email;
    this.api.initReset({ email })
      .pipe(catchError(error => {
        this.alert.show = true;
        if (error.status === 404) {
          this.alert.msg = 'Email not found';
        } else {
          this.alert.msg = 'An unexpected error occurred. Try again in a few minutes...';
        }
        return of();
      }))
      .subscribe(response => {
        this.submitted = true;
      });
  }
}
