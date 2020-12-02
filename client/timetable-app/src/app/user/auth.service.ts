import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    baseUrl = "/api";

    constructor(private http: HttpClient){

    }

    //todo: error handling
    register(user: any):Observable<any>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.baseUrl}/open/signUp`;
        return this.http.post<any>(url, user, {headers:headers});
    }
}