import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { Subject } from 'rxjs';

@Injectable()
export class CryptoService {
  strategy = 'aes-256-cbc';
  _key: string;
  keySubject: Subject<string> = new Subject<string>();
  set key (k: string) {
    this._key = k;
    this.keySubject.next(this._key);
  }
  get key (): string {
    return this._key;
  }
  decrypt (encryptedText: any, key?: string) {
    if (!key && !this.key) {
      return encryptedText;
    }
    try {
      return AES.decrypt(encryptedText, key || this.key).toString(enc.Utf8);
    } catch (e) {
      return AES.decrypt(encryptedText, key || this.key).toString() || '...';
    }
  }
  encrypt (plainText: any, key?: string) {
    if (!key && !this.key) {
      return plainText;
    }
    const encrypted = AES.encrypt(JSON.stringify(plainText), key || this.key).toString();
    return AES.encrypt(JSON.stringify(plainText), key || this.key).toString();
  }
}

