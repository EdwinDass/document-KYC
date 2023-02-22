import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl = environment.baseUrl;
  userid: any = sessionStorage.getItem('Token');
  defaultData = {};
  io: any = sessionStorage.getItem('Token');

  constructor(private http: HttpClient) {
    this.defaultData = this.userid ? this.userid : {}
   }


   getApprovedDocuments() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.defaultData}`
    });

    const requestOptions = { headers: headers };
    return this.http.get(this.BaseUrl + `kyc/approved`, requestOptions);
  }
}
