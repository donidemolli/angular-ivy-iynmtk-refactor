import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demographic, User } from '../interfaces/data-interfaces';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getUserData(): Observable<User[]> {
    return this.httpClient.get<User[]>('assets/userdata.json');
  }

  getDemographicData(): Observable<Demographic[]> {
    return this.httpClient.get<Demographic[]>('assets/demographicsdata.json');
  }
}
