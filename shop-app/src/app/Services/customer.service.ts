import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/Models/customer-models/Customer';
const baseUrl = 'https://localhost:44326/api/customer';
const baseUrl2 = 'https://localhost:44326/api/customer/getallfalse';
const baseUrl1 = 'https://localhost:44326/api/customer/GetNameByCustomerCode';

const headerOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  // get customer name
  getNameByCustomerCode(customercode: string): Observable<any> {
    return this.http.get(`${baseUrl1}/${customercode}`);
  }
  create(customer: Customer): Observable<any> {
    return this.http.post<Customer>(baseUrl, customer, headerOptions);
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(baseUrl);
  }

  // get all customer where isDelete False
  getAllFalse(): Observable<Customer[]> {
    return this.http.get<Customer[]>(baseUrl2);
  }


  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${baseUrl}/${id}`);
  }
  update(customer: Customer): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${customer.id}`, customer, headerOptions);
  }
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
}
