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

  getPendingDocuments() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.defaultData}`
    });

    const requestOptions = { headers: headers };
    return this.http.get(this.BaseUrl + `kyc/pending`, requestOptions);
    // return this.http.get( `http://localhost:5010/kyc/pending`, requestOptions);

  }




  getKycDocument(companyId:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.defaultData}`
    });

    const requestOptions = { headers: headers };
    return this.http.get(this.BaseUrl + `kyc/${companyId}/status`, requestOptions);
    // return this.http.get( `http://localhost:5010/kyc/${companyId}/status`, requestOptions);

  }

  setStatusForDocument(companyId:any, body:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.defaultData}`
    });
    const requestOptions = { headers: headers };
    
    return this.http.patch("https://dev.xuriti.app/api/kyc/"+companyId+"/status",body, requestOptions);
    // return this.http.patch("http://localhost:5010/api/kyc/"+companyId+"/status",body, requestOptions);
  
  }

  getSpecifiedCompanyDetails(companyID: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.defaultData}`
    });

    const requestOptions = { headers: headers };
    return this.http.get(this.BaseUrl + `entity/entity/${companyID}`, requestOptions);
  }



}
