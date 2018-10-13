import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from 'app/enums';

@Component({
  selector: 'pw-input',
  templateUrl: './pw-input.component.html',
  styleUrls: ['./pw-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PwInputComponent),
      multi: true,
    },
  ],
})
export class PwInputComponent implements AfterViewInit, ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() type: InputType = InputType.TEXT;
  @Input() autofocus: boolean;
  @ViewChild('input') input: ElementRef;
  isPassword: boolean;
  model: string;
  pwVisibilityIconSrc = '/assets/eye.svg';
  pwVisibilityIconTitle = 'Show Password';
  ngOnInit () {
    if (this.type === InputType.PASSWORD) {
      this.isPassword = true;
    }
  }
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
  toggleType () {
    if (this.type === 'password') {
      this.type = InputType.TEXT;
      this.pwVisibilityIconSrc = '/assets/hide.svg';
      this.pwVisibilityIconTitle = 'Hide Password';
    } else {
      this.type = InputType.PASSWORD;
      this.pwVisibilityIconSrc = '/assets/eye.svg';
      this.pwVisibilityIconTitle = 'Show Password';
    }
  }
}
