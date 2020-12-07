import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = "/api";

  constructor(private http: HttpClient) { }

  searchByCourseId(subject, catalog_nbr):Observable<any[]>{
    let params = new HttpParams();
    params = params.append('subject', subject);
    params = params.append('catalog_nbr', catalog_nbr);
    const url = `${this.baseUrl}/open/courseid`;
    return this.http.get<any[]>(url, {params: params});
  }


  searchCoursesByKeyword(keyword:string):Observable<any[]>{
    let params = new HttpParams();
    params = params.append('search_keyword', keyword);
    const url = `${this.baseUrl}/open/searchcourse`;
    return this.http.get<any[]>(url, {params: params})
  }

  getAllCourses():Observable<any[]>{
    const url = `${this.baseUrl}/open/courses`;
    return this.http.get<any[]>(url);
  }
}
