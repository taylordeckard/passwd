import {
  AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnDestroy,
  OnInit, Output, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from 'app/enums';
import { UtilsService } from 'app/services';

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
export class PwInputComponent implements AfterViewInit, ControlValueAccessor, OnChanges,
OnDestroy, OnInit {
  @Input() label: string;
  @Input() type: InputType = InputType.TEXT;
  @Input() autofocus: boolean;
  @Input() focus: boolean;
  @Output() focusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() typeChange: EventEmitter<InputType> = new EventEmitter<InputType>();
  @Output() keypress: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @ViewChild('input') input: ElementRef;
  blurListener: () => void;
  focusListener: () => void;
  keypressListener: () => void;
  isPassword: boolean;
  model: string;
  pwVisibilityIconSrc = '/assets/eye.svg';
  pwCloseIconSrc = '/assets/close.svg';
  pwVisibilityIconTitle = 'Show Password';
  constructor (
    private renderer: Renderer2,
    private utils: UtilsService,
  ) {}
  ngOnDestroy () {
    this.blurListener();
    this.focusListener();
    this.keypressListener();
  }
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
  registerOnTouched (fn: Function) {
    this.propagateTouch = fn;
  }
  propagateChange: Function = (_: any) => {};
  propagateTouch: Function = (_: any) => {};

  ngAfterViewInit () {
    if (this.autofocus) {
      this.utils.focusInput(this.input);
    }
    this.blurListener = this.renderer.listen(this.input.nativeElement, 'blur', () => {
      this.propagateTouch();
      this.focusChange.emit(false);
    });
    this.focusListener = this.renderer.listen(this.input.nativeElement, 'focus', () => {
      this.focusChange.emit(true);
    });
    this.keypressListener = this.renderer.listen(
      this.input.nativeElement,
      'keypress',
      this.onKeyPress.bind(this),
    );
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.type && this.isPassword) {
      this.toggleType(changes.type.currentValue);
    }
  }

  toggleType (newType: InputType) {
    this.type = newType;
    this.typeChange.emit(this.type);
    if (newType === InputType.TEXT) {
      this.pwVisibilityIconSrc = '/assets/hide.svg';
      this.pwVisibilityIconTitle = 'Hide Password';
    } else {
      this.pwVisibilityIconSrc = '/assets/eye.svg';
      this.pwVisibilityIconTitle = 'Show Password';
    }
  }
  clearModel () {
    this.model = '';
    this.propagateChange(this.model);
  }
  onKeyPress (event: KeyboardEvent) {
    this.keypress.emit(event);
  }
}
