import { element } from 'protractor';

import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from '../service/product-service.service';
import { Product } from '../Product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeService } from '../service/product-type.service';
import { ProductType } from '../Model/productType';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: Product[];
  name: string;
  productTypes: ProductType[];
   ii: number;

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private toastr: ToastrService,
    private productTypeService: ProductTypeService) {

  }

  ngOnInit(): void {
    // this.productService.getAll().subscribe(resopone=>{
    // this.product= resopone;
    // })
    this.productService.getAllisDeleteFase().subscribe(response => this.product = response);
    this.productTypeService.getAll().subscribe(res => {
      this.productTypes = res;
    });
  }
  addNewProduct(products: Product): void {
    this.product.push(products);
  }
  // get product type Name
  getproductTypeNameBytyId(typeId: number): any{
    this.ii = this.productTypes?.length;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.ii; i++){
        // tslint:disable-next-line: no-unused-expression
        console.log(typeId);
        const pot = this.productTypes[i];
        if (pot.id === typeId){
          this.name = pot.name;
          console.log(pot.name);
          console.log('type ID:', typeId, ' potid ', pot.id);
          return pot.name;

        }
    }
   }
  // edit product
  onEditButtonClick(productId: number): void {
    this.router.navigate(['/productedit', productId]);

  }
  // delete Product
  deleteButtonClick(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.fetchData();
      this.toastr.error('Delete Successfull', 'Message');
    });
  }
  // refresh Data
  fetchData(): void {
    this.productService.getAllisDeleteFase().subscribe(response => this.product = response);
  }

}
