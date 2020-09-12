import { Component, OnInit } from '@angular/core';
import { Customer } from '../Model/Customer';
import { CustomerService } from '../service/customer.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
 customers: Customer[];
  constructor(private customerService: CustomerService,private _router: Router) { }

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
  editButtonClick(customerId: number){
    this._router.navigate(['/edit',customerId]);
  }
  deleteButtonClick(customerId: number){
    this.customerService.deleteCustomer(customerId).subscribe(res=>{
      this.fetchData();
    })
  }
  fetchData(){
    this.customerService.getAll().subscribe((res: Customer[])=>{
      this.customers = res;
    })
  }

}
