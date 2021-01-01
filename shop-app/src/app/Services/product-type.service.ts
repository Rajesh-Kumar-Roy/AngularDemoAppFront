import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ProductType} from 'src/app/Models/Product-models/productType';
import { Observable } from 'rxjs';
const baseUrl = 'https://localhost:44326/api/producttype';
const baseUrl1 = 'https://localhost:44326/api/productType/getallfalse';
const baseUrl2 = 'https://localhost:44326/api/producttype/GetProductTypeByTypeId';
const headerOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }
  create(productType: ProductType): Observable<any>
  {
    return this.http.post<ProductType>(baseUrl, productType, headerOptions);
   }
   getAll(): Observable<ProductType[]>{
     return this.http.get<ProductType[]>(baseUrl);
   }
   getAllisDeleteFalse(): Observable<ProductType[]>{
     return this.http.get<ProductType[]>(baseUrl1);
   }
   getProductTypeByTypeId(id: number): Observable<string>{
    return this.http.get<string>(`${baseUrl2}/${id}`);
   }
   getById(id: number): Observable<ProductType>{
    return this.http.get<ProductType>(`${baseUrl}/${id}`);
   }
   update(productType: ProductType): Observable<void>{
     return this.http.put<void>(`${baseUrl}/${productType.id}`, productType, headerOptions);
   }
   deleteProductType(ptTypeId: number): Observable<void>{
    return this.http.delete<void>(`${baseUrl}/${ptTypeId}`);
   }
}
