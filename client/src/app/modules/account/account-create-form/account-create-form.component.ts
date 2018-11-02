import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pw-account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: ['./account-create-form.component.scss'],
})
export class PwAccountCreateFormComponent implements OnDestroy, OnInit {
  accountForm: FormGroup;
  constructor (
    private fb: FormBuilder,
  ) {
    this.accountForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
  }

  ngOnInit () {
  }

  ngOnDestroy () {
  }

}
