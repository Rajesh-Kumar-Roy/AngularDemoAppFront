import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PaymentType} from 'src/app/Models/payment-models/paymentType';
import {Base} from 'src/app/Url/Base';


const headerOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  baseUrl = Base.baseUrl;
  constructor(private http: HttpClient) { }
  create(paymentType: PaymentType): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/paymentType', paymentType, headerOptions);
  }
  getById(paymentTypeId: number): Observable<PaymentType>{
    return this.http.get<PaymentType>(this.baseUrl + '/api/paymentType' + `/${paymentTypeId}`);
  }
  getAll(): Observable<PaymentType[]>{
    return this.http.get<PaymentType[]>(this.baseUrl + '/api/paymentType');
  }
  getAllFalse(): Observable<PaymentType[]>{
    return this.http.get<PaymentType[]>(this.baseUrl + '/api/paymentType/getallFalse');
  }
  update(paymentType: PaymentType): Observable<void>{
    return this.http.put<void>(this.baseUrl + '/api/paymentType' + `/${paymentType.id}`, paymentType, headerOptions);
  }
}
