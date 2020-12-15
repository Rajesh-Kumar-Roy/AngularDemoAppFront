import { Observable } from 'rxjs';
import { Base } from '../../Url/Base';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const headerOption = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseUrl = Base.baseUrl;
  constructor(private http: HttpClient) { }
  create(body: any): Observable<any>{
    return this.http.post<any>(this.baseUrl, headerOption);
  }
}
