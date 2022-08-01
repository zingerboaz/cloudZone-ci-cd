import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { personModel } from '../components/models/person.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  baseUrl = 'http://nodejs:5000/';            
  person: any;
  token: any ;
 
  // 'https://medical-bz.herokuapp.com/'; 
  
  constructor(private http: HttpClient) { }

  registerUser(a: personModel): Observable<any> {
    return this.http.post(this.baseUrl + "auth/create", a);
  }

  updateDetails(updatepersonForm: personModel): Observable<Object> {
   console.log(updatepersonForm)
    return this.http.put(this.baseUrl + "auth/updateDetails" ,updatepersonForm);
  
  }

  createToken(emailpassword:any): Observable<any>{
    console.log(emailpassword);
    return this.http.post(this.baseUrl +"auth/login",emailpassword)
  }


  post<T>(path: String, data: {}): Observable<T> {
    return this.http.post<T>(this.baseUrl + path, data)
  }

  postWithToken<T>(path: String, data: {}, headers?: object): Observable<T> {
    console.log(data)
    console.log(this.token)
    return this.http.post<T>(this.baseUrl + path, data, this.getOptions(headers))
  
  }
 
 
 
  
  getWithTokenArry<T>(path: String, headers?: object): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + path, this.getOptions(headers))
  }
  getWithToken<T>(path: String, headers?: object): Observable<T> {
    return this.http.get<T>(this.baseUrl + path, this.getOptions(headers))
  }
 
  
  deleteWithToken<T>(path: String,data:any, headers?: object): Observable<T> {
    console.log(data)
    return this.http.delete<T>(this.baseUrl + path + data._id, this.getOptions(headers))
  }
  
  
  
  putWithToken<T>(path: String,data:{}, headers?: object): Observable<T> {
    console.log(data)
    return this.http.put<T>(this.baseUrl + path,data, this.getOptions(headers))
  }


  getOptions(headers?: any) {
    headers = headers ? headers : {};
    headers['content-type'] = 'application/json';
    headers['x-access-token'] = localStorage.getItem('token');
    console.log(headers);
    
    return {
      headers: new HttpHeaders(headers)
    }
  }
}
  




// postWithTokenArry<T>(path: String, headers?: object): Observable<T[]> {
//   return this.http.post<T[]>(this.baseUrl + path,'', this.getOptions(headers))
// }