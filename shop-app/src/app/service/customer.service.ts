import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import{Observable} from'rxjs';

import { Customer } from '../Model/Customer';
const baseUrl="https://localhost:44326/api/customer";
const baseUrl1 ="https://localhost:44326/api/customer/GetNameByCustomerCode";

const headerOptions = {
  headers: new HttpHeaders({
    'content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
//get customer name
  getNameByCustomerCode(customercode: string):Observable<any>{
    return this.http.get(`${baseUrl1}/${customercode}`);
  }
  create(customer: Customer): Observable<any>
  {
    return this.http.post<Customer>(baseUrl, customer,headerOptions);
   }
   getAll(): Observable<Customer[]>{
     return this.http.get<Customer[]>(baseUrl);
   }
}
