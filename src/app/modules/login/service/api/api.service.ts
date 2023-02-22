import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }
 

  login(credentials:any) {
    sessionStorage.setItem('userName', credentials.us);
    sessionStorage.setItem('token', credentials.token);
  }

  AdminLogin(body: { email: string; password: string }): Observable<any>{
    return this.http.post<any>( this.BaseUrl + "auth/user-login", body);
    
  }

  logout(userid: string): Observable<any> {
    const body = {
      userID: userid,
    };
    return this.http.post<any>(this.BaseUrl + "auth/logout", body);
  }
}
