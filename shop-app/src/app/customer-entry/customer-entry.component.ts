import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {Customer} from '../Model/Customer';
import { CustomerService } from '../service/customer.service';
import{ActivatedRoute,Router}from '@angular/router';

@Component({
  selector: 'customer-entry',
  templateUrl: './customer-entry.component.html',
  styleUrls: ['./customer-entry.component.css']
})
export class CustomerEntryComponent implements OnInit {
  public $model:Customer = null
  submitted=false;
  customer: Customer;
  customerForm: FormGroup;
  success: boolean =false;
  constructor(private fb: FormBuilder,private customerService: CustomerService,private route: ActivatedRoute,private router: Router) { 
    this.$model = new Customer();
  }

  ngOnInit(): void {
   this.customerForm = this.fb.group({
    firstName:[this.$model.firstName,Validators.required],
    lastName:[this.$model.lastName],
    mobileNo:[this.$model.mobileNo,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address:[this.$model.address,Validators.maxLength(250)],
    email:[this.$model.email,Validators.email]
   });
   //get id from route link 
   this.route.paramMap.subscribe(params=>{
    const csId =  +params.get('id');
    if(csId){
      this.getCustomer(csId);
    }else{
      this.customer ={
        id: null,
        firstName:'',
        lastName: '',
        email: '',
        mobileNo: '',
        address:'',
        customerCode:''
      };
    }
 });
  }
  getCustomer(id: number){
    this.customerService.getById(id).subscribe(res=>{
      this.customer = res;
      this.editCustomer(this.customer);
    })
  }
//edit customer
editCustomer(customer: Customer){
this.customerForm.patchValue({
  firstName: customer.firstName,
  lastName: customer.lastName,
  mobileNo: customer.mobileNo,
  email: customer.email,
  address: customer.address,
 
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
      //pass value to the form
      this.mapFormValuesToFormModel();
      //update Customer
      if(this.customer.id){
         this.customerService.update(this.customer).subscribe(()=>{
        this.router.navigate(['customerList']);
        });
      }else{
            //Save new customer
      this.customerService.create(this.customerForm.value).subscribe(res=>{
       this.success = true;
       this.router.navigate(['customerList']),
       err=>{
         console.log("someThing Went Worng!");
       }
     });
      }
     
      
    }
    mapFormValuesToFormModel(){
      this.customer.firstName =  this.customerForm.value.firstName;
      this.customer.lastName = this.customerForm.value.lastName;
      this.customer.address = this.customerForm.value.address;
      this.customer.email = this.customerForm.value.email;
      this.customer.mobileNo =this.customerForm.value.mobileNo;
      this.customer.customerCode = this.customerForm.value.customerCode;
     
    }

}
