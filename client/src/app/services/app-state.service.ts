import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PwListView } from 'app/enums';
import { Credentials, User } from 'app/interfaces';
import { ApiService } from './api.service';
import { CryptoService } from './crypto.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppStateService {
  private _editTarget: Credentials;
  private _encryptedPasswords: string;
  private _passwords: Credentials[] = [];
  private _user: User;
  private _view: PwListView;
  public editTargetSubject: Subject<Credentials> = new Subject<Credentials>();
  public encryptedPasswordsSubject: Subject<string> = new Subject<string>();
  public passwordsSubject: Subject<Credentials[]> = new Subject<Credentials[]>();
  public viewSubject: Subject<PwListView> = new Subject<PwListView>();
  constructor (
    private api: ApiService,
    private crypto: CryptoService,
  ) {}
  get editTarget (): Credentials {
    return this._editTarget;
  }
  set editTarget (credentials: Credentials) {
    this._editTarget = credentials;
    if (this._editTarget) {
      this.view = PwListView.FORM;
    }
  }
  get encryptedPasswords () {
    return this._encryptedPasswords;
  }
  set encryptedPasswords (ep: string) {
    this._encryptedPasswords = ep;
    this.encryptedPasswordsSubject.next(this._encryptedPasswords);
  }
  get passwords () {
    return this._passwords;
  }
  set passwords (v: Credentials[])  {
    if (!Array.isArray(v)) {
      this.passwords = [];
    } else {
      this._passwords = v;
    }
    this.passwordsSubject.next(this._passwords);
    this._user.data = this._passwords;
    const userCopy = { ...this._user };
    if (this.crypto.key) {
      userCopy.data = this.crypto.encrypt(this._passwords);
    }
    this.api.updateUser(userCopy)
      .pipe(catchError(err => {
        return of();
      }))
      .subscribe(result => {
        console.log(result);
      });
  }
  get user () {
    return this._user;
  }
  set user (u: User) {
    this._user = u;
    try {
      if (this.crypto.key) {
        this.user.data = JSON.parse(this.crypto.decrypt(this.user.data));
      }
      if (Array.isArray(this.user.data)) {
        this.passwords = <Credentials[]>this.user.data;
      } else {
        throw new Error();
      }
    } catch (e) {
      this.encryptedPasswords = <string>this.user.data;
      this.view = PwListView.KEY;
    }
  }
  get view () {
    return this._view;
  }
  set view (v: PwListView)  {
    this._view = v;
    this.viewSubject.next(this._view);
  }
  deleteCredential (credentials: Credentials) {
    const index = this._passwords.indexOf(credentials);
    this._passwords.splice(index, 1);
    this.passwords = this._passwords;
    this.view = PwListView.LIST;
  }
}
