import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Demographic } from '../../interfaces/data-interfaces';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() cityGroups: Demographic[];
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
    if (this.cityGroups) {
      this.initializeChartData();
    }
  }

  private initializeChartData() {
    Object.keys(this.cityGroups).forEach((city) => {
      const year_population_data = this.cityGroups[city].map(
        (city: Demographic) => [city.year, city.population]
      );
      const citySeries = {
        type: 'line',
        name: city,
        data: year_population_data,
      };
      this.chartRef.addSeries(citySeries);
    });
    this.updateFlag = true;
  }
}
