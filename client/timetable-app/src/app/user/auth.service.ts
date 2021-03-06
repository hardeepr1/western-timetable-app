import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {URLS} from '../utils/helper';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    baseUrl = "/api";
    username: string = '';
    isAdmin: boolean = false;

    constructor(private http: HttpClient){}
    
    register(user: any):Observable<any>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = URLS.USER_REGISTER;
        return this.http.post<any>(url, user, {headers:headers});
    }

    login(user: any): Observable<any>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = URLS.USER_LOGIN;
        return this.http.post<any>(url, user, {headers:headers}).pipe(catchError(this.handleError))
    }

    handleError(err: any): Observable<any>{
        return throwError(err);
    }

    externalLogin(): Observable<any>{
        const url = URLS.PASSPORT_AUTH
        return this.http.get<any>(url);
    }

    getUsers(): Observable<any[]>{
        const url = URLS.ALL_USERS
        return this.http.get<any[]>(url);
    }
    
    updateUsers(users): Observable<any>{
        const url = URLS.ALL_USERS
        return this.http.put<any>(url, users);
    }

    //response will contain username, isAdmin and id_token
    setUserSession(response): void{
        this.username = response.username;
        this.isAdmin = response.isAdmin;
        localStorage.setItem('id_token', response.token);
        localStorage.setItem('user_name', response.username);
        localStorage.setItem('is_admin', response.isAdmin);
    }

    userLoggedIn(): boolean{
        let loggedIn = localStorage.getItem('id_token') !== null;
        return loggedIn;
    }

    logOut(): void {
        this.username = '';
        this.isAdmin = false;
        localStorage.removeItem("id_token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("is_admin");
    }

    getToken():String {
        let token = localStorage.getItem('id_token');
        return token;
    }
    
    getUserName(): String{
        let userName = localStorage.getItem('user_name');
        return userName;
    }

    getIsAdmin(): boolean{
        let isAdmin = localStorage.getItem('is_admin');
        return isAdmin === "true";
    }
}