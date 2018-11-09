import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'pw-button',
  templateUrl: './pw-button.component.html',
  styleUrls: ['./pw-button.component.scss'],
})
export class PwButtonComponent implements OnInit {
  @Input() color: 'danger' | undefined;
  constructor (private elem: ElementRef, private renderer: Renderer2) {}
  ngOnInit () {
  }
}
