import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'app/interfaces';
import { AppStateService } from 'app/services';

@Component({
  selector: 'pw-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  title = 'passwd';
  user: User;
  constructor (
    private state: AppStateService,
  ) {}

  ngOnInit () {
    this.user = this.state.user;
  }
}
