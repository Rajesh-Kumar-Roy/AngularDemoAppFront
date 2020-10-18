import { CustomerService } from '../../Services/customer.service';
import { Customer } from '../../Models/customer-models/Customer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-entry',
  templateUrl: './customer-entry.component.html',
  styleUrls: ['./customer-entry.component.css']
})
export class CustomerEntryComponent implements OnInit {
  public $model: Customer = null;
  submitted = false;
  customer: Customer;
  customerForm: FormGroup;
  success = false;
  showSave = false;
  showUpdate = false;
  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
              this.$model = new Customer();
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [this.$model.firstName, Validators.required],
      lastName: [this.$model.lastName],
      mobileNo: [this.$model.mobileNo, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      address: [this.$model.address, Validators.maxLength(250)],
      email: [this.$model.email, Validators.email]
    });
    // get id from route link
    this.route.paramMap.subscribe(params => {
      const csId = +params.get('id');
      if (csId) {
        this.showUpdate = true;
        this.getCustomer(csId);
      } else {
        this.showSave = true;
        this.customer = {
          id: null,
          firstName: '',
          lastName: '',
          email: '',
          mobileNo: '',
          address: '',
          customerCode: ''
        };
      }
    });
  }
  getCustomer(id: number): void {
    this.customerService.getById(id).subscribe(res => {
      this.customer = res;
      this.editCustomer(this.customer);
    });
  }
  // edit customer
  editCustomer(customer: Customer): void {
    this.customerForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      mobileNo: customer.mobileNo,
      email: customer.email,
      address: customer.address,

    });
  }

  get c(): any {
    return this.customerForm.controls;
  }
  // Save Value
  onSave(): void {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    // pass value to the form
    this.mapFormValuesToFormModel();
    // update Customer
    if (this.customer.id) {
      this.customerService.update(this.customer).subscribe(() => {
        this.router.navigate(['customerList']);
        this.toastr.info('Update Successfull', 'Customer');
      });
    } else {
      // Save new customer
      this.customerService.create(this.customerForm.value).subscribe(res => {
        this.success = true;
        if (this.success) {
          this.showToastr();
        }
        this.router.navigate(['customerList']),
        this.cleanTextBox();
      });
    }


  }
  showToastr(): void {
    this.toastr.success('Save Successfull', 'Customer');
  }
  cleanTextBox(): void {
    this.customerForm.reset();
    this.submitted = false;
  }
  mapFormValuesToFormModel(): void {
    this.customer.firstName = this.customerForm.value.firstName;
    this.customer.lastName = this.customerForm.value.lastName;
    this.customer.email = this.customerForm.value.email;
    this.customer.mobileNo = this.customerForm.value.mobileNo;
    this.customer.customerCode = this.customerForm.value.customerCode;
    this.customer.address = this.customerForm.value.address;

  }

}
