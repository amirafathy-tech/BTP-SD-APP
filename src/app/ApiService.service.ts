import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://sd-dev.c-74814dd.kyma.ondemand.com';

  constructor(private http: HttpClient) { }

  // get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
  //   //params: new HttpParams().set('token', user.token);
  //  // const options = { params, headers :new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)};

  //  // const options = { params, headers };
  //   //console.log(options);
  //   console.log(this.http.get<T>(`${this.baseUrl}/${url}`));
    
  //   return this.http.get<T>(`${this.baseUrl}/${url}`);
  // }
  get<T>(url: string, queryParam?: string, headers?: HttpHeaders): Observable<T> {
    let params = new HttpParams();
    
    if (queryParam) {
      params = params.set('keyword', queryParam);
      console.log(params);
    }
  
    console.log(this.http.get<T>(`${this.baseUrl}/${url}`, { params }));
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params });
  }
  
  getID<T>(url: string, id: number, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    //const options = { params, headers };
    console.log(this.http.get<T>(`${this.baseUrl}/${url}/${id}`));
    return this.http.get<T>(`${this.baseUrl}/${url}/${id}`);
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
   // const options = { headers };
    return this.http.post<T>(`${this.baseUrl}/${url}`, body);
  }

  put<T>(url: string, id: number, body: any, headers?: HttpHeaders): Observable<T> {
   // const options = { headers };
    return this.http.put<T>(`${this.baseUrl}/${url}/${id}`, body);
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    //const options = { headers };
    return this.http.patch<T>(`${this.baseUrl}/${url}`, body);
  }

  delete<T>(url: string, id: any, headers?: HttpHeaders): Observable<T> {
    //const options = { headers };
    return this.http.delete<T>(`${this.baseUrl}/${url}/${id}`);
  }
}