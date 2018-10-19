import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { Subject } from 'rxjs';
import { constants } from 'app/shared';

const charTypes = [
  constants.lowercaseChars,
  constants.numberChars,
  constants.specialChars,
  constants.uppercaseChars,
];

@Injectable()
export class CryptoService {
  strategy = constants.encryptionStrategy;
  _key: string;
  keySubject: Subject<string> = new Subject<string>();
  constructor () {
    this._key = window.localStorage.getItem(constants.encryptionKeyProperty);
  }
  set key (k: string) {
    this._key = k;
    this.keySubject.next(this._key);
    window.localStorage.setItem(constants.encryptionKeyProperty, this._key);
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
  generatePassword (length: number) {
    const randomChars = [];
    const numEachType = Math.floor((1 / charTypes.length) * length);
    const numExtraChars = length % 4;
    // generate an array of random characters
    for (const charType of charTypes) {
      for (let i = 0; i < numEachType; i++) {
        const randomIdx = Math.floor(Math.random() * charType.length);
        randomChars.push(charType[randomIdx]);
      }
    }
    // if characters weren't evenly divisible by number of charTypes, add characters of random type
    // until the number of randomChars is equal to the provided length
    for (let i = 0; i < numExtraChars; i++) {
      let randomIdx = Math.floor(Math.random() * charTypes.length);
      const charType = charTypes[randomIdx];
      randomIdx = Math.floor(Math.random() * charType.length);
      randomChars.push(charType[randomIdx]);
    }
    let pw = '';
    // create a string with random characters in a random order using the randomChars array
    while (randomChars.length) {
      const randomIdx = Math.floor(Math.random() * randomChars.length);
      pw += randomChars[randomIdx];
      randomChars.splice(randomIdx, 1);
    }
    return pw;
  }
}

