import {
  Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild,
} from '@angular/core';
import { fade } from 'app/animations';

@Component({
  selector: 'pw-confirm-modal',
  templateUrl: './pw-confirm-modal.component.html',
  styleUrls: ['./pw-confirm-modal.component.scss'],
  animations: [...fade],
})
export class PwConfirmModalComponent {
  @Input() msg: string;
  @Input() show = false;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirmed: EventEmitter<null> = new EventEmitter<null>();
  clickedCancel () {
    this.show = false;
    this.showChange.emit(this.show);
  }
}
