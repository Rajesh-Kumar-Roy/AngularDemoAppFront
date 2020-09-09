import {HttpResponse,HttpHeaders,HttpClient}from '@angular/common/http'

import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { Sales } from '../Model/Sales';
const baseUrl = "https://localhost:44326/api/sale";
const headerOptions ={
  headers: new HttpHeaders({
    'content-Type':'application/json'
  }) 
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  create(sale: Sales): Observable<Sales>{
    return this.http.post<Sales>(baseUrl,sale,headerOptions);

  }
}
