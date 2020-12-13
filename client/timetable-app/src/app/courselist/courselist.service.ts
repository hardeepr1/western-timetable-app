import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {URLS} from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {
  baseUrl = '/api';
  
  constructor(private http: HttpClient) { }

  getCourseLists(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = URLS.GET_COURSELISTS;
    return this.http.get<any>(url);
  }

  //METHOD TO GET COURSE LIST BY ID
  getCourseList(courseListID): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url =  URLS.CREATE_COURSELIST + "/" + courseListID;
    return this.http.get<any>(url);
  }

  createCourseList(courseList: any): Observable<any>{
    const url = URLS.CREATE_COURSELIST;
    return this.http.post<any>(url, courseList, {headers : {'Content-Type' : 'application/json'}}).pipe(catchError(this.handleError))
  }

  handleError(err: any): Observable<any>{
      return throwError(err);
  }

  getAllCourses(): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = URLS.ALL_COURSES;
    return this.http.get<any>(url);
  }

  updateCourseList(courseListID, updatedCourseList): Observable<any>{
    const url = URLS.CREATE_COURSELIST + "/" + courseListID;
    return this.http.put<any>(url, updatedCourseList, {headers : {'Content-Type' : 'application/json'}});
  }

  deleteCourseList(courseListID): Observable<any>{
    const url =  URLS.CREATE_COURSELIST + "/" + courseListID;
    return this.http.delete<any>(url);
  }
}
