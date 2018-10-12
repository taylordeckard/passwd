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
  creating = false;
  pwForm: FormGroup;
  constructor (private fb: FormBuilder) {
    this.resetForm();
  }
  enterCreateView () {
    this.creating = true;
    this.resetForm();
  }
  resetForm () {
    this.pwForm = this.fb.group({
      title: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy () {
  }
  addPassword () {
    if (this.pwForm.valid) {
      this.passwords = [...(this.passwords || []), this.pwForm.value];
      this.passwordsChange.emit(this.passwords);
    }
    this.creating = false;
  }
  cancelAdd () {
    this.creating = false;
  }
}
