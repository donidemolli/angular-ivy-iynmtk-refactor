import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { chartDataSeries, User } from './interfaces/data-interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public users: { currentUser: User; otherUsers: User[] };
  public chartDataArr: chartDataSeries[] = [];

  constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.loadUserData();
    this.loadDemographicsData();
  }

  private loadUserData() {
    this.dataService.getUsersData().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error: Error) => console.log(error),
    });
  }

  private loadDemographicsData() {
    this.dataService.getDemographicData().subscribe({
      next: (data) => {
        this.chartDataArr = data.chartData;
        console.log(data);
      },
      error: (error: Error) => console.log(error),
    });
  }
}
