import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { IconService } from 'app/services';

@Component({
  selector: 'pw-icon',
  templateUrl: './pw-icon.component.html',
  styleUrls: ['./pw-icon.component.scss'],
})
export class PwIconComponent implements OnInit {
  @Input() src: string;
  @Input() color: 'white' | 'dark' = 'white';
  @Input() size: 'sm' | 'lg' = 'sm';
  svg: SafeHtml;
  constructor (
    private iconService: IconService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit () {
    this.iconService.load(this.src)
      .subscribe((svg: string) => {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }
}
