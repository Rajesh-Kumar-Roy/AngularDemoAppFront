import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:44326/api/';
const headerOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(private injHttp: HttpClient, public endPoint: string) {
  }
  add(objectVm: any): Observable<any> {
    return this.injHttp.post<any>(baseUrl + this.endPoint, objectVm, headerOptions);
  }

  update(objectVm: any): Observable<any> {
    return this.injHttp.put<any>(baseUrl + this.endPoint + '/' + `${objectVm.id}`, objectVm, headerOptions);
  }

  getById(id: number): Observable<any> {
    return this.injHttp.get<any>(baseUrl + this.endPoint + '/' + `${id}`, headerOptions);
  }

  get(): Observable<any> {
    return this.injHttp.get<any>(baseUrl + this.endPoint, headerOptions);
  }

  delete(id: number): Observable<boolean> {
    return this.injHttp.delete<boolean>(baseUrl + this.endPoint + '/' + `${id}`, headerOptions);
  }
}
