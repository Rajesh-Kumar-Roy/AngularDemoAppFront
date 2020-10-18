import { Observable } from 'rxjs';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PaymentType} from 'src/app/Model/paymentModel/paymentType';

const paymentTypeURL = 'https://localhost:44326/api/paymentType';
const headerOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
 create(paymentType: PaymentType): Observable<any>{
   return this.http.post<any>(paymentTypeURL, paymentType, headerOptions);
 }
 getAll(): Observable<PaymentType[]>{
   return this.http.get<PaymentType[]>(paymentTypeURL);
 }
}

