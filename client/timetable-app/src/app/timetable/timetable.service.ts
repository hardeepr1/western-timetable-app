import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {URLS} from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  baseUrl = "/api";

  constructor(private http: HttpClient) { }

  getTimeTables(courseListId): Observable<any>{
    const url = URLS.GET_TIMETABLE + "/" + courseListId;
    return this.http.get<any[]>(url);
  }

}
