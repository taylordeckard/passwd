import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService, AppStateService, CryptoService } from 'app/services';
import { fade } from 'app/animations';
import { Credentials } from 'app/interfaces';
import { PwListView } from 'app/enums';

@Component({
  selector: 'pw-password-key',
  templateUrl: './pw-password-key.component.html',
  styleUrls: ['./pw-password-key.component.scss'],
  animations: [...fade],
})
export class PwPasswordKeyComponent implements OnDestroy, OnInit {
  keyForm: FormGroup;
  keyChangesSub: Subscription;
  encryptedPasswords: string;
  decryptedPasswords: string;
  encryptedPasswordsSub: Subscription;
  successfulDecryption: boolean;
  constructor (
    private api: ApiService,
    private crypto: CryptoService,
    private fb: FormBuilder,
    private state: AppStateService,
  ) {}
  ngOnDestroy () {
    if (this.encryptedPasswordsSub) {
      this.encryptedPasswordsSub.unsubscribe();
    }
    if (this.keyChangesSub) {
      this.keyChangesSub.unsubscribe();
    }
  }
  ngOnInit () {
    const key = this.crypto.key;
    this.resetKeyForm(key);
    this.encryptedPasswords = this.state.encryptedPasswords;
    this.onKeyChange(key);
    this.encryptedPasswordsSub = this.state.encryptedPasswordsSubject
      .subscribe((ep: string) => {
        if (ep) {
          this.encryptedPasswords = ep;
          this.decryptedPasswords = this.crypto.decrypt(ep, this.keyForm.value.key);
        }
      });
    this.keyChangesSub = this.keyForm.valueChanges.subscribe((value: { key: string }) => {
      this.onKeyChange(value.key);
    });
  }
  resetKeyForm (key: string) {
    this.keyForm = this.fb.group({
      key: [key || '', Validators.required]
    });
  }
  cancelEditKey () {
    this.state.view = PwListView.LIST;
  }
  saveKey () {
    this.crypto.key = this.keyForm.value.key;
    this.state.view = PwListView.LIST;
    this.state.passwords = this.state.passwords;
    if (!this.encryptedPasswords) { return; }
    try {
      this.state.passwords = JSON.parse(this.crypto.decrypt(this.encryptedPasswords));
    } catch (e) {
      this.state.passwords = [];
    }
    this.state.encryptedPasswords = null;
  }
  onKeyChange (key: string) {
    if (!this.encryptedPasswords) { return; }
    this.decryptedPasswords = this.crypto.decrypt(this.encryptedPasswords, key);
    try {
      JSON.parse(this.decryptedPasswords);
      this.successfulDecryption = true;
    } catch (e) {
      this.successfulDecryption = false;
    }
  }
}
