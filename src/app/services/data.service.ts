import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  chartDataSeries,
  Demographic,
  User,
} from '../interfaces/data-interfaces';
import * as _ from 'lodash';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}

  public getUsersData(): Observable<{ currentUser: User; otherUsers: User[] }> {
    return this.httpClient.get<User[]>('assets/userdata.json').pipe(
      map((users) => {
        return { currentUser: users.splice(0, 1)[0], otherUsers: users };
      })
    );
  }

  public getDemographicData(): Observable<{
    chartData: chartDataSeries[];
    originalData: Demographic[];
  }> {
    return this.httpClient
      .get<Demographic[]>('assets/demographicsdata.json')
      .pipe(map((demo) => this.format_demographic_data(demo)));
  }

  private format_demographic_data(demo: Demographic[]) {
    let chartData: chartDataSeries[] = [];
    const demo_groupBy_City = _.groupBy(demo, 'city');
    Object.keys(demo_groupBy_City).forEach((city) => {
      const year_population_data = demo_groupBy_City[city].map(
        (city: Demographic) => [city.year, city.population]
      );
      const citySeries = {
        type: 'line',
        name: city,
        data: year_population_data,
      };
      chartData.push(citySeries);
    });
    return { chartData: chartData, originalData: demo };
  }
}
