import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  baseUrl = "/api";

  constructor(private http: HttpClient) { }

  getTimeTables(courseListId): Observable<any>{
    const url = `${this.baseUrl}/open/timetable/${courseListId}`;
    return this.http.get<any[]>(url);
  }

}
