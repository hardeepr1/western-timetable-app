import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  baseUrl = '/api';
  constructor(private http: HttpClient) { }

  addReview(review): Observable<any>{
    const url = `${this.baseUrl}/secure/review`;
    return this.http.post<any>(url, review);
  }

  getReviews(subject, catalog_nbr): Observable<any>{
    let params = new HttpParams();
    params = params.append('subject', subject);
    params = params.append('catalog_nbr', catalog_nbr);
    const url = `${this.baseUrl}/secure/review`;
    return this.http.get<any[]>(url, {params: params})
  }
}
