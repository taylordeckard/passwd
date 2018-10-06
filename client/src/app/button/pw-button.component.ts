import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fade } from '../animations';

@Component({
  selector: 'pw-button',
  templateUrl: './pw-button.component.html',
  styleUrls: ['./pw-button.component.scss'],
  animations: [...fade],
})
export class PwButtonComponent implements OnInit {
  constructor (private elem: ElementRef, private renderer: Renderer2) {}
  ngOnInit () {
  }
}
