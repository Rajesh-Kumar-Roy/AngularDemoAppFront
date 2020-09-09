import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import{ FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ProductType} from '../Model/productType';
import { ProductTypeService } from '../service/product-type.service';

@Component({
  selector: 'product-type-entry',
  templateUrl: './product-type-entry.component.html',
  styleUrls: ['./product-type-entry.component.css']
})
export class ProductTypeEntryComponent implements OnInit {
productType: ProductType[]; 
productTypeForm: FormGroup;
submitted = false;
isSuccess: boolean = false;

  constructor(private fb: FormBuilder,private productTypeService: ProductTypeService) { 
   
  }

  ngOnInit(): void {
    this.productTypeForm = this.fb.group({
      name:['',Validators.required],
      code: ['',Validators.required],
      description: ['']
    })
  }
  get pt(){
    return this.productTypeForm.controls;
  }
  onSubmit(){
    this.submitted =true;
     //stop if form is invalid
     if(this.productTypeForm.invalid){
       return;
     }
     this.productTypeService.create(this.productTypeForm.value).subscribe(res=>{
       this.isSuccess =true;
       
      
     })
  }

}
