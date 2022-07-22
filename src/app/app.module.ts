import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { PhonePipe } from './pipes/phone.pipe';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
  ],
  providers: [DataService],
  declarations: [AppComponent, PhonePipe, LineChartComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
