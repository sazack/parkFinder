import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class ParkService {
  constructor(private http: HttpClient){}
  getParksList() {
    return this.http.get('/api/parks');
  }
}
