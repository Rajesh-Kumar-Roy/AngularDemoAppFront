import { Component, OnInit } from '@angular/core';
import{ FormGroup,FormControl,Validators, FormBuilder, FormArray} from '@angular/forms';
import{Sales} from '../Model/Sales';
import { Product } from '../Product';
import { ProductServiceService } from '../service/product-service.service';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { __values } from 'tslib';
import { ProductTypeService } from '../service/product-type.service';
import { ProductType } from '../Model/productType';
import {SalesDetailsService} from '../service/sales-details.service';
import { SalesDetails } from '../Model/SaleDetails';
import { Observable } from 'rxjs';
import {SalesService} from "../service/sales.service"
import {CustomerService} from '../service/customer.service'

@Component({
  selector: 'sales-master-details',
  templateUrl: './sales-master-details.component.html',
  styleUrls: ['./sales-master-details.component.css']
})
export class SalesMasterDetailsComponent implements OnInit {
  public $Model: Sales = null;
  public $DetailModel: SalesDetails = null;
   sale: Sales[];
   salesDetails: SalesDetails[];
   salesForm: FormGroup;
   hideCustomerCode: boolean =true;
   submitted=false;
   regShowHide: boolean =false;
   productAdded: boolean =false;
   products: Product[];
   unitPriceByProductId: number;
   productByType: Product[];
   productType: ProductType[];
   totalPrice: number;
   unqDate: string;
   customerCodeValue: any;
   getSaleCode: string;
  constructor(private fb: FormBuilder,private customerService: CustomerService,private saleService: SalesService,private productService: ProductServiceService,private productTypeService: ProductTypeService,private salesDetailsService: SalesDetailsService) {
    this.$Model = new Sales(); this.$DetailModel = new SalesDetails();
    this.unqDate ="S-" + Date.now().toString();
 
   }
    
     
  ngOnInit(): void {
     this.salesForm = this.fb.group({
      customerName:[this.$Model.customerName, Validators.required],
       date: [this.$Model.date, Validators.required],
       saleNo:[this.$Model.saleNo],
       description: [this.$Model.description, Validators.maxLength(250)],
       details:this.fb.array([
         this.addDetailsFormGroup()
       ])
     });
     this.salesDetailsService.getAll().subscribe((response=>{
       if(response.length>0){
         this.salesDetails=response;
       }
     }))
     this.productService.getAll().subscribe((res: Product[])=>{
       if(res.length>0){
        this.products =res;
       }
     });
     this.productTypeService.getAll().subscribe((res: ProductType[])=>{
       if(res.length>0){
         this.productType =res;
       }
     });
     

  }
  get Sel(){
    return this.salesForm.controls;
  }
  addDetailsFormGroup():FormGroup{
    return this.fb.group({
      unitPrice:[this.$DetailModel.unitPrice,Validators.required],
      qty:[this.$DetailModel.qty,Validators.required],
      totalPrice:[this.$DetailModel.totalPrice,Validators.required],
      description:[this.$DetailModel.description, Validators.maxLength(100)]
    })
  }

  //registration Button CLick
  registrationButtonClick(){
    this.regShowHide = true;
    this.hideCustomerCode = false;
    console.log("Click")
  }
  //registration cancel Button 
  regCancelButton(){
    this.regShowHide=false;
    this.hideCustomerCode  = true;

  }
  removeDetailsButton(detailsIndex: number):void{
    const detailsFormArray= (<FormArray>this.salesForm.get('details'));
    detailsFormArray.removeAt(detailsIndex);
    detailsFormArray.markAsDirty();
    detailsFormArray.markAsUntouched();
  }
  ChangeSelectedValue($event): any{
    this.productService.getProductByTypeId(($event.target.value)).subscribe((res: Product[])=>{
      if(res.length>0){
        this.productByType=res;
      }
    })  
  }
  //get unit price by product id
  changeProductSelectValue($event){
    this.salesDetailsService.getPriceByProductId($event.target.value).subscribe(res=>{
      this.unitPriceByProductId = res;
    })
  }
  //get qty 
  onKey(event): any {
   return this.totalPrice =this.unitPriceByProductId * event.target.value;
        
  }
  //Find Customer Name and Sales  Code
  findCustomer(event):any{
   this.customerService.getNameByCustomerCode(event.target.value).subscribe(res=>{
     this.customerCodeValue = res;
     this.saleService.getCustomerNameByCode(event.target.value).subscribe(res1=>{
       this.getSaleCode = res1;
     })
   })
    }
  //Save Value
  onSave(){
    this.submitted = true;
    if(this.salesForm.invalid){
      return ;
    }
  }
  addProduct(){
    this.productAdded =true;
    (<FormArray> this.salesForm.get('details')).push(this.addDetailsFormGroup());
  }
  productLoop(): any{
    this.products.forEach(function (value1) {
      return value1.id;
  })
  }
  ;
  

}
