import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { fade } from 'app/animations';
import { Credentials } from 'app/interfaces';

@Component({
  selector: 'pw-credential',
  templateUrl: './pw-credential.component.html',
  styleUrls: ['./pw-credential.component.scss'],
  animations: [...fade],
})
export class PwCredentialComponent {
  @Input() credential: Credentials;
  @ViewChild('copyTooltip') copyTooltip: ElementRef;
  constructor (
    private renderer: Renderer2,
  ) {}
  copyPassword () {
    const copyElem: any = document.createElement('textarea');
    copyElem.style.opacity = '0';
    copyElem.value = this.credential.password;
    document.body.appendChild(copyElem);
    copyElem.select();
    document.execCommand('copy');
    document.body.removeChild(copyElem);
    this.showPasswordCopiedTooltip();
  }

  showPasswordCopiedTooltip () {
    this.renderer.setStyle(this.copyTooltip.nativeElement, 'opacity', 1);
    this.renderer.setStyle(this.copyTooltip.nativeElement, 'top', '-16px');
    setTimeout(() => {
      this.renderer.setStyle(this.copyTooltip.nativeElement, 'opacity', 0);
      this.renderer.setStyle(this.copyTooltip.nativeElement, 'top', '-12px');
    }, 600);
  }
}
