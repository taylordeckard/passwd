import {
  Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild,
} from '@angular/core';
import { fade } from 'app/animations';
import { Credentials } from 'app/interfaces';
import { AppStateService, UtilsService } from 'app/services';

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
    private state: AppStateService,
    private utils: UtilsService,
  ) {}

  copyPassword () {
    this.utils.copyToClipboard(this.credential.password);
    // this.showPasswordCopiedTooltip();
  }

  showPasswordCopiedTooltip () {
    this.renderer.setStyle(this.copyTooltip.nativeElement, 'opacity', 1);
    this.renderer.setStyle(this.copyTooltip.nativeElement, 'top', '-16px');
    setTimeout(() => {
      this.renderer.setStyle(this.copyTooltip.nativeElement, 'opacity', 0);
      this.renderer.setStyle(this.copyTooltip.nativeElement, 'top', '-12px');
    }, 600);
  }

  editCredential () {
    this.state.editTarget = this.credential;
  }
}
