import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {URLS} from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  searchByCourseId(subject, catalog_nbr):Observable<any[]>{
    let params = new HttpParams();
    params = params.append('subject', subject);
    params = params.append('catalog_nbr', catalog_nbr);
    const url = URLS.SEARCH_BY_COURSEID;
    return this.http.get<any[]>(url, {params: params});
  }


  searchCoursesByKeyword(keyword:string):Observable<any[]>{
    let params = new HttpParams();
    params = params.append('search_keyword', keyword);
    const url = URLS.SEARCH_BY_KEYWORD;
    return this.http.get<any[]>(url, {params: params})
  }

  getAllCourses():Observable<any[]>{
    const url = URLS.ALL_COURSES;
    return this.http.get<any[]>(url);
  }
}
