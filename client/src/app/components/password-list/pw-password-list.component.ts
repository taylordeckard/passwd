import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'app/services';
import { fade } from 'app/animations';
import { Credentials } from 'app/interfaces';
import { PwListView } from 'app/enums';

@Component({
  selector: 'pw-password-list',
  templateUrl: './pw-password-list.component.html',
  styleUrls: ['./pw-password-list.component.scss'],
  animations: [...fade],
})
export class PwPasswordListComponent implements OnDestroy, OnInit {
  passwords: Credentials[];
  passwordsSub: Subscription;
  constructor (
    private state: AppStateService,
  ) {}
  ngOnDestroy () {
    if (this.passwordsSub) {
      this.passwordsSub.unsubscribe();
    }
  }
  ngOnInit () {
    this.passwords = this.state.passwords;
    this.passwordsSub = this.state.passwordsSubject
      .subscribe((passwords: Credentials[]) => {
        this.passwords = passwords;
      });
  }
  enterCreateView () {
    this.state.view = PwListView.FORM;
  }
  enterKeyView () {
    this.state.view = PwListView.KEY;
  }
}
