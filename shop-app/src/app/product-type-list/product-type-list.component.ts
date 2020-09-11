import { Component, OnInit } from '@angular/core';
import {ProductTypeService} from '../service/product-type.service';
import{ProductType} from '../Model/productType';

@Component({
  selector: 'product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})
export class ProductTypeListComponent implements OnInit {
productType: ProductType[];
  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.productTypeService.getAll().subscribe(response=>{
      if(response == null){
        err => {
          alert('Something went wrong!');
        }
      }
      this.productType=response;
    })
  }


}
