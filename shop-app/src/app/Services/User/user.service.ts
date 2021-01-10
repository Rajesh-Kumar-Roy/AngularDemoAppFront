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
  //#regionRegistration
  create(body: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/applicationUser/registration', body, headerOption);
  }
  //#endregion
  //#region Login
  createUserLogin(body: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/applicationUser/Login', body, headerOption);
  }
  //#endregion
  //#region User Profile
  getUserProfile(): any{
    //  const tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
   
    return this.http.get(this.baseUrl+ '/api/UserProfile/getUserProfile');
  }
  //#endregion
  //#region Check Roles
  roleMatch(allowedRoles): boolean{
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  //#endregion
}
