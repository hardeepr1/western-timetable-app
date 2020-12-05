import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    baseUrl = "/api";
    username: string = '';
    isAdmin: boolean = false;

    constructor(private http: HttpClient){

    }

    //todo: error handling
    register(user: any):Observable<any>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.baseUrl}/open/signup`;
        return this.http.post<any>(url, user, {headers:headers});
    }

    //todo: error handling
    login(user: any): Observable<any>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.baseUrl}/open/signin`;
        return this.http.post<any>(url, user, {headers:headers});
    }

    getUsers(): Observable<any[]>{
        const url = `${this.baseUrl}/secure/users`;
        return this.http.get<any[]>(url);
    }


    updateUsers(users): Observable<any[]>{
        const url = `${this.baseUrl}/secure/users`;
        return this.http.put<any[]>(url, users);
    }

    //response will contain username, isAdmin and id_token
    setUserSession(response): void{
        this.username = response.username;
        this.isAdmin = response.isAdmin;
        localStorage.setItem('id_token', response.token);
    }

    userLoggedIn(): boolean{
        return true;
        // let loggedIn = localStorage.getItem('id_token') !== null;
        // return loggedIn;
    }

    logOut(): void {
        this.username = '';
        localStorage.removeItem("id_token");
    }

    getToken():String {
        let token = localStorage.getItem('id_token');
        return token;
    }
    
}