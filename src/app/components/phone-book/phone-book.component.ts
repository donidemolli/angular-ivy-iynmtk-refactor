import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { User } from '../../interfaces/data-interfaces';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css'],
})
export class PhoneBookComponent implements OnInit, OnChanges {
  @Input() users: { currentUser: User; otherUsers: User[] };

  public currentUser: User;
  public otherUsers: User[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.currentUser = this.users?.currentUser;
    this.otherUsers = this.users?.otherUsers;
  }
}
