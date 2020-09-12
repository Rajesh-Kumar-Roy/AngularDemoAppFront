import { Injectable } from '@angular/core';
import{Product} from '../Product';

import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = "https://localhost:44326/api/product";
const baseUrl1="https://localhost:44326/api/product/getproductbyTypeId";
const headerOptions ={
  headers: new HttpHeaders({
    'content-Type':'application/json'
  }) 
}
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  create(product: Product): Observable<any>
 {
   return this.http.post<Product>(baseUrl, product,headerOptions);
  }
  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(baseUrl);
  }

  getProductByTypeId(id: number):Observable<Product[]>{
    return this.http.get<Product[]>(`${baseUrl1}/${id}`);
  }
  //product type name calling
  
  getById(id: number):Observable<Product>{
    //api id wise product
    return this.http.get<Product>(`${baseUrl}/${id}`);
}

update(product: Product): Observable<void>{
    //api code for id 
    return this.http.put<void>(`${baseUrl}/${product.id}`,product,headerOptions);
}  
deleteProduct(id: number): Observable<void>{
  return this.http.delete<void>(`${baseUrl}/${id}`);
 }  

}
