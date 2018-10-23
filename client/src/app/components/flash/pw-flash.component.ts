import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { fade } from 'app/animations';

@Component({
  selector: 'pw-flash',
  templateUrl: './pw-flash.component.html',
  styleUrls: ['./pw-flash.component.scss'],
  animations: [...fade],
})
export class PwFlashComponent implements OnInit {
  @Input() message: string;
  @Input() positionX: number;
  @Input() positionY: number;
  constructor (
    private elem: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit () {
    this.renderer.setStyle(this.elem.nativeElement, 'left', `${this.positionX - 50}px`);
    this.renderer.setStyle(this.elem.nativeElement, 'top', `${this.positionY - 40}px`);
  }
}
