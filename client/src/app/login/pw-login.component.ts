import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { fade } from '../animations';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pw-login',
  templateUrl: './pw-login.component.html',
  styleUrls: ['./pw-login.component.scss'],
  animations: [...fade],
})
export class PwLoginComponent implements OnDestroy {
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
        console.log(err);
        return of();
      }))
      .subscribe(response => {
        console.log(response);
      });
  }
  ngOnDestroy () {
    if (this.loginPostSub) {
      this.loginPostSub.unsubscribe();
    }
  }
}
