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
  unitPriceByProductId: Array<number> = [];
  productList: Array<Product> = [];
  productType: Array<ProductType> = [];
  result: any;
  totalPrices: Array<number> = [];
  customerCodeValue: any = '';
  customer: Customer[];
  loadSaleCode: any;
  success = false;
  @Input() untPrce: number;
  @Input() tolprc: number;
  pdTypeId: number;
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
    this.productList = [];
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
    this.productService.getAllisDeleteFase().subscribe(res => this.productList = res);

  }
  get Sel(): any {
    return this.salesForm.controls;
  }
   // tslint:disable-next-line: typedef
   get salesDetail() {
    return this.salesForm.get('salesDetails') as FormArray;
  }
  addDetailsFormGroup(): FormGroup {
    return this.fb.group({
      productTypeId: [''],
      id: [this.$DetailModel.id],
      productId: [this.$DetailModel.productId, Validators.required],
      unitPrice: [this.$DetailModel.unitPrice, Validators.required],
      qty: [this.$DetailModel.qty, Validators.required],
      totalPrice: [this.$DetailModel.totalPrice, Validators.required],
      description: [this.$DetailModel.description, Validators.maxLength(100)],
    });

  }

 // tslint:disable-next-line: typedef
 private newDetailsFormGroup(){
    return new FormGroup({
      productTypeId: new FormControl(null),
      productId: new FormControl(null),
      unitPrice: new FormControl(null),
      qty: new FormControl(null),
      totalPrice: new FormControl(null),
      description: new FormControl(''),
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
    const detailsFormArray = (this.salesForm.get('salesDetails') as FormArray);
    detailsFormArray.removeAt(detailsIndex);
    detailsFormArray.markAsDirty();
    detailsFormArray.markAsUntouched();
  }

  // changeProductSelectValue($event): void {
  //   const pId = $event.target.value;
  //   const plen = this.products.length;
  //   for (let i = 0; i < plen; i++) {
  //     const produ = this.products[i];
  //     // tslint:disable-next-line: triple-equals
  //     if (produ.id == pId) {
  //       this.unitPriceByProductId.push(produ.price) ;
  //     }
  //   }
  //   console.log(this.unitPriceByProductId);
  // }


  // get  price by product id
  getProductUnitPrice(inputId: number): Product[]{
    return this.productList.filter(item => item.id == inputId);
  }

    // get qty
    onKey(event, n: number): any {
      this.totalPrices.push(1200 * event.target.value);
        // this.totalPrices.push (event.target.value * Number(this.getProductUnitPrice(n)));
    }
  // product dropdown value set
  getProduct(inputId: number): Product[] {
    return this.productList.filter(item => item.productTypeId == inputId);
  }

  getTotalPrice(n: number): number{
    for (let i = 0; i < n + 1; i++ ){
        return this.totalPrices[i];
    }
  }
  // Find Customer Name and Sales  Code
  findCustomer(event): void {
    // tslint:disable-next-line: triple-equals
    const len = event.target.value.length;
    const check = event.target.value;
    const codeUpper = check.toUpperCase();
    // tslint:disable-next-line: one-variable-per-declaration
    const codeCheck = codeUpper.substring(0, 3);
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
    console.log(this.salesForm.value);
    this.submitted = true;
    if (this.salesForm.invalid)
    {
      this.toastr.error('Fill the Form Correctly!', 'Sale');
      return;
    }
    this.saleService.create(this.salesForm.value).subscribe(res => {
      if (res) {
        this.toastr.success('Save successfully', 'Sale');
        this.salesForm.reset();
        this.submitted = false;
      }

    });
  }

  addProduct(): void {
    this.productAdded = true;
    const ctrl = (this.salesForm.get('salesDetails') as FormArray);
    ctrl.push(this.newDetailsFormGroup());
  }



}
