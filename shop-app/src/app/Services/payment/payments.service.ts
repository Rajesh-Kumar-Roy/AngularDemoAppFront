import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PaymentType} from 'src/app/Models/payment-models/paymentType';

const baseUrl = 'https://localhost:44326/api/paymentType';
const headerOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }
  create(paymentType: PaymentType): Observable<any>{
    return this.http.post<any>(baseUrl, paymentType, headerOptions);
  }
  getAll(): Observable<PaymentType[]>{
    return this.http.get<PaymentType[]>(baseUrl);
  }
}
