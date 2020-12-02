import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {
  baseUrl = '/api';
  
  constructor(private http: HttpClient) { }

  getCourseLists(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.baseUrl}/secure/courselist`;
    return this.http.get<any>(url);
  }
}
