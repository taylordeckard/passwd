import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pw-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements AfterViewInit, ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text';
  @Input() autofocus: boolean;
  @ViewChild('input') input: ElementRef;
  model: string;
  writeValue (value: any) {
    this.model = value;
  }
  registerOnChange (fn: Function) {
    this.propagateChange = fn;
  }
  registerOnTouched () {}
  propagateChange: Function = (_: any) => {};

  ngAfterViewInit () {
    if (this.autofocus) {
      this.input.nativeElement.focus();
    }
  }
}
