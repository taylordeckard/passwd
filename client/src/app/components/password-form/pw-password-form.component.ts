import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fade } from 'app/animations';
import { Credentials } from 'app/interfaces';
import { PwListView } from 'app/enums';
import { AppStateService } from 'app/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pw-password-form',
  templateUrl: './pw-password-form.component.html',
  styleUrls: ['./pw-password-form.component.scss'],
  animations: [...fade],
})
export class PwPasswordFormComponent implements OnDestroy, OnInit {
  pwForm: FormGroup;
  passwords: Credentials[];
  passwordsSub: Subscription;
  editTarget: Credentials;
  editTargetSub: Subscription;
  constructor (
    private fb: FormBuilder,
    private state: AppStateService,
  ) {
    this.resetCredForm();
  }

  ngOnInit () {
    this.editTarget = this.state.editTarget;
    this.passwords = this.state.passwords;
    this.editTargetSub = this.state.editTargetSubject
      .subscribe((editTarget: Credentials) => {
        this.editTarget = editTarget;
        this.resetCredForm(editTarget);
      });
    this.passwordsSub = this.state.passwordsSubject
      .subscribe((passwords: Credentials[]) => {
        this.passwords = passwords;
      });
    if (this.editTarget) {
        this.resetCredForm(this.editTarget);
    }
  }

  ngOnDestroy () {
    if (this.passwordsSub) {
      this.passwordsSub.unsubscribe();
    }
    if (this.editTargetSub) {
      this.editTargetSub.unsubscribe();
    }
  }

  resetCredForm (cred?: Credentials) {
    this.pwForm = this.fb.group({
      title: [(cred && cred.title) || '', Validators.required],
      username: [(cred && cred.username) || '', Validators.required],
      password: [(cred && cred.password) || '', Validators.required],
    });
  }

  addPassword () {
    if (this.pwForm.valid) {
      if (this.editTarget) {
        this.editTarget.title = this.pwForm.value.title;
        this.editTarget.username = this.pwForm.value.username;
        this.editTarget.password = this.pwForm.value.password;
        this.state.passwords = this.passwords;
      } else {
        this.state.passwords = [...(this.passwords || []), this.pwForm.value];
      }
    }
    this.editTarget = null;
    this.state.view = PwListView.LIST;
  }

  cancelAdd () {
    this.state.view = PwListView.LIST;
    this.state.editTarget = null;
  }

  onCredDelete () {
    this.state.deleteCredential(this.editTarget);
    this.state.editTarget = null;
  }
}
