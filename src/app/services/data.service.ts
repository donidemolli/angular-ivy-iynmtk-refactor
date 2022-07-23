import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Demographic, User } from '../interfaces/data-interfaces';
import * as _ from 'lodash';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getUsersData(): Observable<{ currentUser: User; otherUsers: User[] }> {
    return this.httpClient.get<User[]>('assets/userdata.json').pipe(
      map((users) => {
        return { currentUser: users.splice(0, 1)[0], otherUsers: users };
      })
    );
  }

  getDemographicData(): Observable<Demographic[]> {
    return this.httpClient
      .get<Demographic[]>('assets/demographicsdata.json')
      .pipe(map((demo) => _.groupBy(demo, 'city')));
  }
}
