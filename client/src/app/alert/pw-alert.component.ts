import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fade } from 'app/animations';
import { AlertColor } from 'app/enums';

@Component({
  selector: 'pw-alert',
  templateUrl: './pw-alert.component.html',
  styleUrls: ['./pw-alert.component.scss'],
  animations: [...fade],
})
export class PwAlertComponent {
  @Input() show = false;
  @Input() msg: string;
  @Input() color: AlertColor = AlertColor.DANGER;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor () {}
  hide () {
    this.show = false;
    this.showChange.emit(this.show);
  }
}
