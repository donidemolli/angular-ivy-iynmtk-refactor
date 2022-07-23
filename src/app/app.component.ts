import { Component, OnInit } from '@angular/core';
import { Demographic, User } from './interfaces/data-interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public users: { currentUser: User; otherUsers: User[] };

  public demographics: Demographic[];

  constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.loadUserData();
    this.loadDemographicsData();
  }

  private loadUserData() {
    this.dataService.getUserData().subscribe((users) => {
      this.users = users;
    });
  }

  private loadDemographicsData() {
    this.dataService.getDemographicData().subscribe((demo) => {
      this.demographics = demo;
    });
  }
}
