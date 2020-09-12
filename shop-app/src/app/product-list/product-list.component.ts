import { Component, OnInit } from '@angular/core';
import{ProductServiceService} from '../service/product-service.service';
import { Product } from '../Product';
import{Router}from '@angular/router'



@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 product: Product[];
 
  constructor(private productService: ProductServiceService,private _router: Router) { }
 
  ngOnInit(): void {
   // this.productService.getAll().subscribe(resopone=>{
     // this.product= resopone;
   // })
   this.productService.getAll().subscribe(response=>this.product = response);
  }
  addNewProduct(products: Product){
    this.product.push(products);
  }
  onEditButtonClick(productId:number){
    this._router.navigate(['/productedit',productId])

  }
  deleteButtonClick(productId: number){
   this.productService.deleteProduct(productId).subscribe(()=>{
     this.fetchData();
   })
  }
  fetchData(){
    this.productService.getAll().subscribe(response=>this.product = response);
  }

}
