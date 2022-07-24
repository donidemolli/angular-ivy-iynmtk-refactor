import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { chartDataSeries } from '../../interfaces/data-interfaces';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() seriesArr: chartDataSeries[];
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
    this.seriesArr.forEach((series) => this.chartRef.addSeries(series));
    this.updateFlag = true;
  }
}
