import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from './launch.model'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.apiUrl);
  }
}

