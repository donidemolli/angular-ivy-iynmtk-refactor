import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() demographics;
  private chartRef;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Demographics',
    },
    series: [],
  };

  updateFlag = false;

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };

  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    this.initializeChartData();
  }

  private initializeChartData() {
    const arrayZip = (a, b) => a.map((k, i) => [k, b[i]]);
    const cityGroups = _.groupBy(this.demographics, 'city');
    Object.keys(cityGroups).forEach((city) => {
      console.log(cityGroups[city]);
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
