import { AuthService } from './../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends AuthService {

  readonly endPoint = 'admin/Role';
  constructor(private http: HttpClient) {
    super(http, 'admin/Role');
  }
}
