import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'app/services';
import { Credentials } from 'app/interfaces';
import { PwListView } from 'app/enums';

@Component({
  selector: 'pw-view-outlet',
  templateUrl: './pw-view-outlet.component.html',
  styleUrls: ['./pw-view-outlet.component.scss'],
})
export class PwViewOutletComponent implements OnDestroy, OnInit {
  view: PwListView = PwListView.LIST;
  viewSub: Subscription;
  constructor (private state: AppStateService) {}
  ngOnDestroy () {
    if (this.viewSub) {
      this.viewSub.unsubscribe();
    }
  }
  ngOnInit () {
    this.viewSub = this.state.viewSubject
      .subscribe((view: PwListView) => {
        this.view = view;
      });
  }
}
