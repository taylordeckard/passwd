import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services';
import { fade } from 'app/animations';
import { Credentials } from 'app/interfaces';

@Component({
  selector: 'pw-password-list',
  templateUrl: './pw-password-list.component.html',
  styleUrls: ['./pw-password-list.component.scss'],
  animations: [...fade],
})
export class PwPasswordListComponent implements OnDestroy {
  @Input() passwords: Credentials[];
  @Output() passwordsChange: EventEmitter<Credentials[]> = new EventEmitter<Credentials[]>();
  editingCred: Credentials;
  editingCredIdx: number;
  pwForm: FormGroup;
  showForm = false;
  constructor (private fb: FormBuilder) {
    this.resetForm();
  }
  enterCreateView () {
    this.showForm = true;
    this.resetForm();
  }
  resetForm (cred?: Credentials) {
    this.pwForm = this.fb.group({
      title: [(cred && cred.title) || '', Validators.required],
      username: [(cred && cred.username) || '', Validators.required],
      password: [(cred && cred.password) || '', Validators.required],
    });
  }
  ngOnDestroy () {
  }
  addPassword () {
    if (this.pwForm.valid) {
      if (this.editingCred) {
        this.editingCred.title = this.pwForm.value.title;
        this.editingCred.username = this.pwForm.value.username;
        this.editingCred.password = this.pwForm.value.password;
      } else {
        this.passwords = [...(this.passwords || []), this.pwForm.value];
      }
      this.passwordsChange.emit(this.passwords);
    }
    this.resetEditingCred();
    this.showForm = false;
  }
  cancelAdd () {
    this.resetEditingCred();
    this.showForm = false;
  }
  onCredEdit (cred: Credentials, index: number) {
    this.showForm = true;
    this.resetForm(cred);
    this.editingCred = cred;
    this.editingCredIdx = index;
  }
  onCredDelete () {
    this.passwords.splice(this.editingCredIdx, 1);
    this.passwordsChange.emit(this.passwords);
    this.showForm = false;
    this.resetEditingCred();
  }
  resetEditingCred () {
    this.editingCred = null;
    this.editingCredIdx = null;
  }
}
