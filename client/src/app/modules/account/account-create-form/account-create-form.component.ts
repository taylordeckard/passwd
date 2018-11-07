import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'app/services';
import { AlertColor } from 'app/enums';
import { AlertProps } from 'app/interfaces';

const MIN_NUM_CHARS = 12;
const SPECIAL_CHARS_RE = /[ !"#$%&'()*+,-.\/:;<=>?@\[\\\]^_`{|}~]/;
const NUMBER_RE = /[0-9]/;
const UPPERCASE_RE = /[A-Z]/;
const LOWERCASE_RE = /[a-z]/;
const LENGTH_RE = new RegExp(`.{${MIN_NUM_CHARS}}`);

@Component({
  selector: 'pw-account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: ['./account-create-form.component.scss'],
})
export class PwAccountCreateFormComponent implements OnDestroy, OnInit {
  alert: AlertProps = {
    show: false,
    color: AlertColor.DANGER,
    msg: '',
  };
  accountForm: FormGroup;
  passwordFocus: boolean;
  valueChanges: Subscription;
  minNumChars = MIN_NUM_CHARS;
  submitted = false;
  constructor (
    private api: ApiService,
    private fb: FormBuilder,
  ) {
    this.accountForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
        Validators.required,
        this.hasLength,
        this.hasOneLowercase,
        this.hasOneNumber,
        this.hasOneSpecialChar,
        this.hasOneUppercase,
        this.pwValidatorFn('repeatPassword'),
      ]],
      repeatPassword: ['', [Validators.required, this.pwValidatorFn('password')]],
    });
  }

  ngOnInit () {
    let lastChange: any = { password: '', repeatPassword: '' };
    this.valueChanges = this.accountForm.valueChanges
      .subscribe((changes: { [key: string]: any }) => {
        if (lastChange.password !== changes.password) {
          lastChange = changes;
          this.accountForm.controls.repeatPassword.updateValueAndValidity();
        }
        if (lastChange.repeatPassword !== changes.repeatPassword) {
          lastChange = changes;
          this.accountForm.controls.password.updateValueAndValidity();
        }
      });
  }

  ngOnDestroy () {
    if (this.valueChanges) {
      this.valueChanges.unsubscribe();
    }
  }

  pwValidatorFn (controlType: 'password' | 'repeatPassword'): Function {
    return (control: FormControl): { [key: string]: any } | null => {
      if (!this.accountForm) { return null; }
      const otherInput: FormControl = <FormControl>this.accountForm.controls[controlType];
      if (otherInput.value && control.value && control.value !== otherInput.value) {
        return {
          passwordMismatch: { value: control.value || null },
        };
      }
      return null;
    };
  }

  hasOneSpecialChar (control: FormControl) {
    // Look for at least 1 special character
    if (!SPECIAL_CHARS_RE.test(control.value)) {
      return { missingSpecialChar: { value: control.value || null } };
    }
  }
  hasOneNumber (control: FormControl) {
    // Look for at least 1 number
    if (!NUMBER_RE.test(control.value)) {
      return { missingNumber: { value: control.value || null } };
    }
  }
  hasOneUppercase (control: FormControl) {
    // Look for at least 1 uppercase letter
    if (!UPPERCASE_RE.test(control.value)) {
      return { missingUppercase: { value: control.value || null } };
    }
  }
  hasOneLowercase (control: FormControl) {
    // Look for at least 1 lowercase letter
    if (!LOWERCASE_RE.test(control.value)) {
      return { missingLowercase: { value: control.value || null } };
    }
  }
  hasLength (control: FormControl) {
    // Ensure password is at least a specific lengthk
    if (!LENGTH_RE.test(control.value)) {
      return { insufficientLength: { value: control.value || null } };
    }
  }

  get password () { return this.accountForm.get('password'); }
  get repeatPassword () { return this.accountForm.get('repeatPassword'); }
  get email () { return this.accountForm.get('email'); }

  validate(controlType: 'password' | 'repeatPassword') {
    this.accountForm.controls[controlType].updateValueAndValidity();
  }

  onSubmit () {
    const email = this.accountForm.value.email;
    const password = this.accountForm.value.password;
    this.api.register({ email, password })
      .pipe(catchError(error => {
        console.log(error);
        this.alert.show = true;
        if (error.status === 409) {
          this.alert.msg = 'Email is in use. Do you already have an account?';
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
