import { Component, OnInit } from '@angular/core';
import { Customer } from '../Model/Customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
 customers: Customer[];
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe(res=>{
      if(res==null){
        err=>{
          console.log("Something went Worng!!");
        }
        
      }
      this.customers= res;
    })
  }

}
