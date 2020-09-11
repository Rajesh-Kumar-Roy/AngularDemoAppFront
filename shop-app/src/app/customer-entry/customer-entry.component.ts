import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {Customer} from '../Model/Customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'customer-entry',
  templateUrl: './customer-entry.component.html',
  styleUrls: ['./customer-entry.component.css']
})
export class CustomerEntryComponent implements OnInit {
  public $model:Customer = null
  submitted=false;
  customerForm: FormGroup;
  success: boolean =false;
  constructor(private fb: FormBuilder,private customerService: CustomerService) { 
    this.$model = new Customer();
  }

  ngOnInit(): void {
   this.customerForm = this.fb.group({
    firstName:[this.$model.firstName,Validators.required],
    lastName:[this.$model.lastName],
    mobileNo:[this.$model.moblieNo,Validators.required],
    address:[this.$model.address,Validators.maxLength(250)],
    email:[this.$model.email,Validators.email]
   });


  }
  get c(){
    return this.customerForm.controls;
  }
    //Save Value
    onSave(){
      this.submitted = true;
      console.log(this.submitted)
      if(this.customerForm.invalid){
        return ;
      }
      this.customerService.create(this.customerForm.value).subscribe(res=>{
        this.success = true;
      })
    }

}
