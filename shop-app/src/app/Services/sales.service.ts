import { Base } from 'src/app/Url/Base';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';

import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { Sales } from 'src/app/Models/Sale-models/Sales';



const baseUrl = 'https://localhost:44326/api/sale';
const baseUrl1 = 'https://localhost:44326/api/sale/GetCustomerNameByCode';
const baseUrl3 = 'https://localhost:44326/api/sale/GetSaleCode';
const baseUrl4 = 'https://localhost:44326/api/sale/getAllFalse';
const baseUrl5 = 'https://localhost:44326/api/sale/getSaleBySaleId';

const headerOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  rootBaseUrl = Base.baseUrl;

  constructor(private http: HttpClient) { }

  create(sale: Sales): Observable<Sales> {
    return this.http.post<Sales>(this.rootBaseUrl + '/api/sale', sale, headerOptions);

  }
  getCustomerNameByCode(customerCode: string): Observable<any> {
    return this.http.get(`${baseUrl1}/${customerCode}`);
  }
  // get sales code
  getSaleCode(): Observable<any> {
    return this.http.get<any>(baseUrl3);
  }
  // get all sales where isDelete is False
  getAllisDeleteFase(): Observable<Sales[]> {
    return this.http.get<Sales[]>(baseUrl4);
  }
  // get sale by sale id
  getSaleBySaleId(id: number): Observable<Sales> {
    return this.http.get<Sales>(`${baseUrl5}/${id}`);
  }
  update(sale: Sales): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${sale.id}`, sale, headerOptions);
  }
  PaymentStatus(id: number, statusId: number): Observable<void>{
    return this.http.put<void>(this.rootBaseUrl + '/api/sale/PaymentStatus' + `/${id}`, statusId, headerOptions);
  }
}
