import { Payment } from './../../Models/payment-models/payment';
import { MobileBankingType } from './../../Models/payment-models/mobileBankingType';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PaymentType} from 'src/app/Models/payment-models/paymentType';
import {Base} from 'src/app/Url/Base';
import { PaymentOption} from 'src/app/Models/payment-models/paymentOption';


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

  //#region payment Type
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
  getLastRow(): Observable<Payment>{
    return this.http.get<Payment>(this.baseUrl + '/api/payment/getLastRow');
  }
  //#endregion

  //#region payment Option
  PaymentOptionCreate(paymentOption: PaymentOption): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/paymentOption', paymentOption, headerOptions);
  }
  PaymentOptionGetAllFalseData(): Observable<PaymentOption[]>{
    return this.http.get<PaymentOption[]>(this.baseUrl + '/api/paymentOption/getAllFalse', headerOptions);
  }
  paymentOptionGetById(id: number): Observable<PaymentOption>{
    return this.http.get<PaymentOption>(this.baseUrl + '/api/paymentOption' + `/${id}`, headerOptions);

  }
  PaymentOptionUpdate(paymentOption: PaymentOption): Observable<void>{
    return this.http.put<void>(this.baseUrl + '/api/paymentOption' + `/${paymentOption.id}`, paymentOption, headerOptions);
  }

  //#endregion

  //#region Mobile Banking Type
  MobileBankingTypeGetAllFalseData(): Observable<MobileBankingType[]>{
    return this.http.get<MobileBankingType[]>(this.baseUrl + '/api/mobileBankingType/GetAllFalse');
  }
  MobileBankingTypeGetById(id: number): Observable<MobileBankingType>{
    return this.http.get<MobileBankingType>(this.baseUrl + '/api/mobileBankingType' + `/${id}`, headerOptions);
  }
  MobileBankingTypeUpdate(mobileBanking: MobileBankingType): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/mobileBankingType/AddOrUpdate' + `/${mobileBanking.id}`, mobileBanking, headerOptions);
  }
  MobileBankingTypeAdd(mobileBanking: MobileBankingType): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/mobileBankingType/AddOrUpdate' + `/${0}`, mobileBanking, headerOptions);
  }
  //#endregion

  //#region Payment
  PaymentCreate(payment: Payment): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/payment/AddOrUpdate' + `/${0}`, payment, headerOptions);
  }
  getPaymentById(PaymentId: number): Observable<Payment>{
    return this.http.get<Payment>(this.baseUrl + '/api/payment/getPaymentById' + `/${PaymentId}`);
  }
  //#endregion
}
