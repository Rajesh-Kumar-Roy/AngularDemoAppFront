import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import{ProductType} from '../Model/productType'
import { Observable } from 'rxjs';
const baseUrl = "https://localhost:44326/api/producttype";
const headerOptions ={
  headers: new HttpHeaders({
    'content-Type':'application/json'
  }) 
}
@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }
  create(productType: ProductType): Observable<any>
  {
    return this.http.post<ProductType>(baseUrl, productType,headerOptions);
   }
   getAll(): Observable<ProductType[]>{
     return this.http.get<ProductType[]>(baseUrl);
   }
   getById(id: number):Observable<ProductType>{
    return this.http.get<ProductType>(`${baseUrl}/${id}`);
   }
   update(productType: ProductType): Observable<void>{
     return this.http.put<void>(`${baseUrl}/${productType.id}`,productType,headerOptions);
   }
}
