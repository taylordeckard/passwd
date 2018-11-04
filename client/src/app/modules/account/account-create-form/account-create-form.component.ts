import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pw-account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: ['./account-create-form.component.scss'],
})
export class PwAccountCreateFormComponent implements OnDestroy, OnInit {
  accountForm: FormGroup;
  passwordFocus: boolean;
  valueChanges: Subscription;
  constructor (
    private fb: FormBuilder,
  ) {
    this.accountForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, this.pwValidatorFn('repeatPassword')]],
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

  get password () { return this.accountForm.get('password'); }
  get repeatPassword () { return this.accountForm.get('repeatPassword'); }
  get email () { return this.accountForm.get('email'); }

  validate(controlType: 'password' | 'repeatPassword') {
    this.accountForm.controls[controlType].updateValueAndValidity();
  }
}
