import { Component, OnInit } from '@angular/core';
import{ProductServiceService} from '../service/product-service.service';
import { Product } from '../Product';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 product: Product[];
 
  constructor(private productService: ProductServiceService) { }
 
  ngOnInit(): void {
   // this.productService.getAll().subscribe(resopone=>{
     // this.product= resopone;
   // })
   this.productService.getAll().subscribe(response=>this.product = response);
  }
  addNewProduct(products: Product){
    this.product.push(products);
  }

}
