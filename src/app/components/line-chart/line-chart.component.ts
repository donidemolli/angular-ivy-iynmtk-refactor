import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import { Demographic } from '../../interfaces/data-interfaces';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() demographics: Demographic[];
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
    const arrayZip = (a, b) => a.map((el, index) => [el, b[index]]);
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
