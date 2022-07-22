import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { User } from '../../interfaces/data-interfaces';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css'],
})
export class PhoneBookComponent implements OnInit, OnChanges {
  @Input() users: User[];

  public currentUser: User;
  public otherUsers: User[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.currentUser = this.users.splice(0, 1)[0];
    this.otherUsers = this.users;
  }
}
