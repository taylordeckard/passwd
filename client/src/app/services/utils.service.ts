import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  copyToClipboard (text: string) {
    const copyElem: any = document.createElement('textarea');
    copyElem.style.opacity = '0';
    copyElem.value = text;
    document.body.appendChild(copyElem);
    copyElem.select();
    document.execCommand('copy');
    document.body.removeChild(copyElem);
  }
}
