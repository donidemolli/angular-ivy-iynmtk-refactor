import { Component, OnInit } from '@angular/core';
import { User, Demographic } from './data-interfaces';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public currentUser: User;
  public otherUsers: User[];

  private chartRef;
  private demographics: Demographic[];
  public updateFlag: boolean = false;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Demographics',
    },
    series: [],
  };

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };

  constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.loadUserData();
    this.loadDemographicsData();
  }

  private loadUserData() {
    this.dataService.getUserData().subscribe((users) => {
      this.currentUser = users.splice(0, 1)[0];
      this.otherUsers = users;
    });
  }

  private loadDemographicsData() {
    this.dataService.getDemographicData().subscribe((demo) => {
      this.demographics = demo;
      this.initializeChartData();
    });
  }

  private initializeChartData() {
    const arrayZip = (a, b) => a.map((k, i) => [k, b[i]]);
    const cityGroups = _.groupBy(this.demographics, 'city');
    Object.keys(cityGroups).forEach((city) => {
      const citySeries = {
        type: 'line',
        name: city,
        data: arrayZip(
          cityGroups[city].map((d) => d.year),
          cityGroups[city].map((d) => d.population)
        ),
      };
      this.chartRef.addSeries(citySeries);
    });
    this.updateFlag = true;
  }
}
