import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import{Product} from '../Product';
import{FormGroup,FormControl,FormBuilder,Validators} from'@angular/forms';
import {ProductServiceService} from '../service/product-service.service';
import{ProductType} from '../Model/productType'
import { ProductTypeService } from '../service/product-type.service';

@Component({
  selector: 'product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {
  product: Product[];
  
  productForm: FormGroup;
  submitted = false;
  isSuccess: boolean =false;
  
  public productType: ProductType[] =[];
  @Output() onAdd: EventEmitter<Product>;
  constructor(private fb: FormBuilder,private productService: ProductServiceService,private productTypeService: ProductTypeService) {
    this.onAdd = new EventEmitter<Product>();
   }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['',Validators.required],
      price:['',Validators.required],
      productTypeId:['',Validators.required],
      description:[''],

    });
    this.productTypeService.getAll().subscribe((res: ProductType[])=>{
      if(res.length>0){
        this.productType= res;
     

      }
    })
    
  }
  get p(){
    return this.productForm.controls;
  }
  onSave(){
     this.submitted =true;
     //stop if form is invalid
     if(this.productForm.invalid){
       return;
     }
    this.productService.create(this.productForm.value).subscribe(res=>{
      this.isSuccess =true;
      //pass value to list if success
      this.onAdd.emit(res);
      
    })
  }

}
