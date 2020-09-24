import { Customer } from './../Model/Customer';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Sales } from '../Model/Sales';
import { Product } from '../Product';
import { ProductServiceService } from '../service/product-service.service';
import { __values } from 'tslib';
import { ProductTypeService } from '../service/product-type.service';
import { ProductType } from '../Model/productType';
import { SalesDetailsService } from '../service/sales-details.service';
import { SalesDetails } from '../Model/SaleDetails';
import { SalesService } from '../service/sales.service';
import { CustomerService } from '../service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Console } from 'console';


@Component({
  selector: 'app-sales-master-details',
  templateUrl: './sales-master-details.component.html',
  styleUrls: ['./sales-master-details.component.css']
})
export class SalesMasterDetailsComponent implements OnInit {
  public $Model: Sales = null;
  public $DetailModel: SalesDetails = null;
  sale: Sales[];
  salesDetails: SalesDetails[];
  salesForm: FormGroup;
  hideCustomerCode = true;
  submitted = false;
  regShowHide = false;
  productAdded = true;
  products: Product[];
  unitPriceByProductId: number;
  productList: Product[];
  productByTypeList: any[] = [];
  productType: ProductType[];
  totalPrices: number;
  unqDate: string;
  customerCodeValue: any = '';
  customer: Customer[];
  lastItem: any[];
  loadSaleCode: any;
  success = false;
  @Input() untPrce: number;
  @Input() tolprc: number;
  csId: number;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private saleService: SalesService,
    private productService: ProductServiceService,
    private productTypeService: ProductTypeService,
    private salesDetailsService: SalesDetailsService,
    private toastr: ToastrService
  ) {
    this.$Model = new Sales(); this.$DetailModel = new SalesDetails();
    this.unqDate = `S-${Date.now().toString()}`;

  }


  ngOnInit(): void {
    this.salesForm = this.fb.group({
      id: [this.$Model.id],
      customerId: [this.csId, Validators.required],
      date: [this.$Model.date, Validators.required],
      saleNo: [this.$Model.saleNo],
      description: [this.$Model.description, Validators.maxLength(250)],
      salesDetails: this.fb.array([
        this.addDetailsFormGroup()
      ])
    });
    this.salesDetailsService.getAll().subscribe((response => {
      if (response.length > 0) {
        this.salesDetails = response;
      }
    }));
    // get All Product
    this.productService.getAll().subscribe((res: Product[]) => {
      if (res.length > 0) {
        this.products = res;
      }
    });
    // get all product Type where isDelete IS false
    this.productTypeService.getAllisDeleteFalse().subscribe((res: ProductType[]) => {
      if (res.length > 0) {
        this.productType = res;
      }
    });
    // get all Customer where isDelete Is false
    this.customerService.getAllFalse().subscribe((res: Customer[]) => {
      if (res.length > 0) {
        this.customer = res;
      }
    });
    // get sale code when page reload
    this.saleService.getSaleCode().subscribe(res => {
      if (res?.length > 0) {
        this.loadSaleCode = res;
      }
    });

  }
  get Sel(): any {
    return this.salesForm.controls;
  }
  addDetailsFormGroup(): FormGroup {
    return this.fb.group({
      // productTypeId: [this.$DetailModel.productTypeId, Validators.required],
      id: [this.$DetailModel.id],
      productId: [this.$DetailModel.productId, Validators.required],
      unitPrice: [this.$DetailModel.unitPrice, Validators.required],
      qty: [this.$DetailModel.qty, Validators.required],
      totalPrice: [this.$DetailModel.totalPrice, Validators.required],
      description: [this.$DetailModel.description, Validators.maxLength(100)],
      saleId: [this.$DetailModel.saleId]
    });
  }

  // registration Button CLick
  registrationButtonClick(): void {
    this.regShowHide = true;
    this.hideCustomerCode = false;
  }
  // registration cancel Button
  regCancelButton(): void {
    this.regShowHide = false;
    this.hideCustomerCode = true;
  }

  removeDetailsButton(detailsIndex: number): void {
    const detailsFormArray = (this.salesForm.get('details') as FormArray);
    detailsFormArray.removeAt(detailsIndex);
    detailsFormArray.markAsDirty();
    detailsFormArray.markAsUntouched();
  }

  changeSelectedValue($event): any {
    this.productService.getProductByTypeId(($event.target.value)).subscribe((res: Product[]) => {
      if (res.length > 0) {
        this.productList = res;
      }
    });
  }

  // get  price by product id
  changeProductSelectValue($event): void {
    const pId = $event.target.value;
    const plen = this.products.length;
    for (let i = 0; i < plen; i++) {
      const produ = this.products[i];
      if (produ.id == pId) {
        this.unitPriceByProductId = produ.price;
      }
    }
  }
  // get qty
  onKey(event): any {
    return this.totalPrices = this.unitPriceByProductId * event.target.value;

  }
  // Find Customer Name and Sales  Code
  findCustomer(event): void {
    // tslint:disable-next-line: triple-equals
    const len = event.target.value.length;
    const check = event.target.value;
    const codeUpper = check.toUpperCase();
    // tslint:disable-next-line: one-variable-per-declaration
    const codeCheck = codeUpper.substring(0, 3);
    // tslint:disable-next-line: triple-equals
    // if ('CC-' == codeCheck) {
    //   console.log((event.target.value).length);
    //   this.customerService.getNameByCustomerCode(check).subscribe(res => {
    //     this.customerCodeValue = res;
    //   });
    // }
    const ii = this.customer.length;
    for (let i = 0; i < ii; i++) {
      // tslint:disable-next-line: no-unused-expression

      const pot = this.customer[i];
      // tslint:disable-next-line: triple-equals
      if ('CC-' == codeCheck && check.length === 19 && check.length > 12) {
        if (pot.customerCode === codeUpper) {
          this.customerCodeValue = pot.firstName;
          this.csId = pot.id;

        }
      }
      // tslint:disable-next-line: max-line-length
      // tslint:disable-next-line: triple-equals
      else if (('013' == codeCheck || '014' === codeCheck || '015' === codeCheck || '016' === codeCheck || '017' === codeCheck ||
        '019' === codeCheck || '018' === codeCheck) && check.length === 11) {
        console.log(check.length);
        if (pot.mobileNo === check) {
          this.customerCodeValue = pot.firstName;
          this.csId = pot.id;

        }
        if (pot.mobileNo !== check && len === 11) {
          this.toastr.warning('Can Not Find Customer', 'Alert', {
            timeOut: 1500
          });
        }
      }
      else if (len === 19) {
        this.toastr.warning('Can Not Find Customer', 'Alert', {
          timeOut: 1500
        });
      }
      else {
        this.customerCodeValue = ' ';
      }
    }

  }

  // Save Value
  onSaveSale(): any {
    this.salesForm.value.customerId = this.csId;
    this.submitted = true;
    if (this.salesForm.invalid) { return; }
    this.saleService.create(this.salesForm.value).subscribe(res => {
      if (res) {
        this.toastr.success('Save successfully', 'Sale');
      }

    });
  }

  addProduct(): void {
    this.productAdded = true;
    (this.salesForm.get('details') as FormArray).push(this.addDetailsFormGroup());
  }



}
