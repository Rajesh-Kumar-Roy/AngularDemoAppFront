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
  
  getById(id: number){
    //api id wise product
}

update(product: Product){
    //api code for id 
}    

}
