import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {URLS} from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  baseUrl = '/api';
  constructor(private http: HttpClient) { }

  addReview(review): Observable<any>{
    const url = URLS.ADD_REVIEW
    return this.http.post<any>(url, review);
  }

  getAllReview(): Observable<any>{
    const url = URLS.ALL_REVIEWS;
    return this.http.get<any[]>(url);
  }

  //Called by admin user to updated all reviews
  updateReviews(reviews): Observable<any>{
    const url = URLS.ALL_REVIEWS;
    return this.http.post<any>(url, reviews);
  }
  
  getReviews(subject, catalog_nbr): Observable<any>{
    let params = new HttpParams();
    params = params.append('subject', subject);
    params = params.append('catalog_nbr', catalog_nbr);
    const url = URLS.GET_COURSE_REVIEW;
    return this.http.get<any[]>(url, {params: params})
  }
}
