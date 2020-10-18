
import { SalesDetails } from '../../Models/Sale-models/SaleDetails';
import { Customer } from '../../Models/customer-models/Customer';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Sales } from '../../Models/Sale-models/Sales';
import { Product } from '../../Models/Product-models/Product';
import { ProductServiceService } from '../../Services/product-service.service';
import { __values } from 'tslib';
import { ProductTypeService } from '../../Services/product-type.service';
import { ProductType } from '../../Models/Product-models/productType';
import { SalesDetailsService } from '../../Services/sales-details.service';
import { SalesService } from '../../Services/sales.service';
import { CustomerService } from '../../Services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { PaymentStatusEnum } from '../../Enums/PaymentStatusEnum';


@Component({
  selector: 'app-sales-entry',
  templateUrl: './sales-entry.component.html',
  styleUrls: ['./sales-entry.component.css'],
})
export class SalesEntryComponent implements OnInit {
  public $Model: Sales = null;
  public $DetailModel: SalesDetails = null;
  sale: Sales[];
  salesDetails: SalesDetails[];
  salesForm: FormGroup;
  hideCustomerCode = true;
  submitted = false;
  regShowHide = false;
  productAdded = true;
  showUpdateButton = false;
  showSaveButton = false;
  products: Product[];
  unitPriceByProductId: Array<number> = [];
  productList: Array<Product> = [];
  productType: Array<ProductType> = [];
  result: any;
  priceArray: Array<number> = [];
  totalPrices: Array<number> = [];
  customerCodeValue: any = '';
  customer: Customer[];
  loadSaleCode: any;
  success = false;
  pdTypeId: number;
  csId: number;
  ptId: number;
  pro: any;
  findCs: Customer[];
  detailsSale: Sales;
  prod: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private saleService: SalesService,
    private productService: ProductServiceService,
    private productTypeService: ProductTypeService,
    private salesDetailsService: SalesDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.$Model = new Sales(); this.$DetailModel = new SalesDetails();
  }

  ngOnInit(): void {
    this.salesForm = this.fb.group({
      id: [this.$Model.id],
      customerName: [''],
      customerCode: [''],
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
    // get route Link
    this.route.paramMap.subscribe(parmas => {
      const sId = +parmas.get('id');
      if (sId) {
        this.showUpdateButton = true;
        this.getSaleDetails(sId);
      } else {
        this.showSaveButton = true;
        this.detailsSale = {
          id: null,
          customerId: null,
          customerName: '',
          date: new Date(),
          description: '',
          paymentStatusId: null,
          isDelete: false,
          saleNo: this.saleService.getSaleCode().subscribe(res => {
            if (res?.length > 0) {
              // get sale code
              this.loadSaleCode = res;
            }
          }).toString(),
          salesDetails: [],
        };
      }
    });
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
    this.productService.getAllisDeleteFase().subscribe(res => this.productList = res);
  }
  // get sale with sale Details
  getSaleDetails(id: number): void {
    this.saleService.getSaleBySaleId(id).subscribe((res: Sales) => {
      this.editSaleDetails(res);
      this.detailsSale = res;
      console.log(this.detailsSale);
    });
  }
  editSaleDetails(sale: Sales): void {
    this.salesForm.patchValue({
      customerId: sale.customerId,
      customerName: this.findEditCustomerName(sale.customerId),
      saleNo: sale.saleNo,
      date: formatDate(sale.date, 'MM/dd/yyyy', 'en_US'),
      description: sale.description
    });
    // call formarray property
    this.salesForm.setControl('salesDetails', this.setExistingDetail(sale.salesDetails));
  }
  setExistingDetail(detailSets: SalesDetails[]): FormArray {
    const formArray = new FormArray([]);
    detailSets.forEach(d => {
      formArray.push(this.fb.group({
        id: d.id,
        productTypeId: this.findproductTypeId(d.productId),
        productId: d.productId,
        unitPrice: d.unitPrice,
        qty: d.qty,
        totalPrice: d.totalPrice,
        description: d.description,
        isDelete: false
      }));
    });
    return formArray;
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
      id: [this.$DetailModel.id],
      productTypeId: [''],
      productId: [this.$DetailModel.productId, Validators.required],
      unitPrice: [this.$DetailModel.unitPrice, Validators.required],
      qty: [this.$DetailModel.qty, Validators.required],
      totalPrice: [this.$DetailModel.totalPrice, Validators.required],
      description: [this.$DetailModel.description, Validators.maxLength(100)],
    });

  }

  // tslint:disable-next-line: typedef
  //  private newDetailsFormGroup(){
  //     return new FormGroup({
  //       productTypeId: new FormControl(null),
  //       productId: new FormControl(null),
  //       unitPrice: new FormControl(null),
  //       qty: new FormControl(null),
  //       totalPrice: new FormControl(null),
  //       description: new FormControl(''),
  //     });
  //   }
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
  // remove Detail
  removeDetailsButton(detailsIndex: number): void {
    const detailsFormArray = (this.salesForm.get('salesDetails') as FormArray);
    detailsFormArray.removeAt(detailsIndex);
    detailsFormArray.markAsDirty();
    detailsFormArray.markAsUntouched();
  }


  // get  price by product id
  getProductUnitPrice(inputId: number): Product[] {
    // tslint:disable-next-line: triple-equals
    return this.productList.filter(item => item.id == inputId);
  }

  // changeProductType($event): void {
  //   this.prod = null;
  //   console.log('id', $event.target.value);
  //   this.productService.getProductByTypeId(Number($event.target.value)).subscribe(res => {
  //     this.prod = res;
  //   });
  // }
  // getProduct(): any{
  //   if (this.pId != null || this.pId != 0){
  //     console.log(this.prod.filter(item=> item.id == this.pId));
  //     this.pro = this.prod.filter(item=> item.id == this.pId);
  //   }
  // }
  // product dropdown value set
  // getProduct(): void {
  //   console.log(this.ptId );
  //   console.log(typeof(this.ptId ));
  //   console.log( this.prod);

  //   // tslint:disable-next-line: triple-equals
  //   // return this.productList.filter(item => item.productTypeId == inputId);
  // }


   // product dropdown value set
  getProduct(inputId: number): Product[] {
    // tslint:disable-next-line: triple-equals
    return this.productList.filter(item => item.productTypeId == inputId);
  }

  // get Total Price
  getTotalPrice(qty: number, unitPrice: number): number {
    return qty * unitPrice;
  }
  // when edit find product type Id
  findproductTypeId(id: number): void {
    this.productService.getAllisDeleteFase().subscribe(res => {
      const result = res;
      for (let i = 0; i < res?.length; i++) {
        const cs = result[i];
        if (cs.id === id) {
          this.salesDetail.patchValue([
            { productTypeId: cs.productTypeId }
          ]
          );
          this.productService.getProductByTypeId(Number(cs.productTypeId)).subscribe(res1 => {
            this.prod = res1;
          });
        }
      }
    });
  }
  // when edit find customer name
  findEditCustomerName(sid: number): void {
    this.customerService.getAllFalse().subscribe(res => {
      const result = res;
      if (res != null) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res?.length; i++) {
          const cs = result[i];
          if (cs.id === sid) {
            this.salesForm.patchValue({
              customerName: cs.firstName
            });
          }
        }
      }
    });
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
          this.salesForm.patchValue({
            customerId: pot.id
          });

        }
      }
      // tslint:disable-next-line: max-line-length
      // tslint:disable-next-line: triple-equals
      else if (('013' == codeCheck || '014' === codeCheck || '015' === codeCheck || '016' === codeCheck || '017' === codeCheck ||
        '019' === codeCheck || '018' === codeCheck) && check.length === 11) {
        if (pot.mobileNo === check) {
          this.customerCodeValue = pot.firstName;
          this.csId = pot.id;
          this.salesForm.patchValue({
            customerId: pot.id
          });
        }
        if (pot.mobileNo !== check && len === 11) {
          this.toastr.success('Find Customer', 'customer', {
            timeOut: 1500
          });
        }
      }
      else if (len === 19) {
        this.toastr.success('Find Customer', 'Customer', {
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
    this.submitted = true;
    if (this.salesForm.invalid) {
      this.toastr.error('Fill the Form Correctly!', 'Sale');
      return;
    }

    this.mapFormValuesToFormModel();
    // update Sale with details
    if (this.detailsSale.id) {
      this.saleService.update(this.detailsSale).subscribe(() => {
        this.toastr.info('Update Successful', 'Sale');
        this.router.navigate(['saleDetails']);
      });
    } else {
      // Save new Sale
      this.salesForm.value.paymentStatusId = PaymentStatusEnum.Due;
      this.saleService.create(this.salesForm.value).subscribe(res => {
        if (res) {
          this.toastr.success('Save successfully', 'Sale');
          this.router.navigate(['/saleView', res.id]);
          this.salesForm.patchValue({
            id: 0,
            customerId: 0,
            customerName: '',
            customerCode: '',
            date: new Date(),
            description: '',
          });
          this.salesDetail.clear();
          this.addProduct();
          this.clean();
        }
      });
    }
  }

  clean(): void {
    if (this.salesForm.value.saleNo == '' || this.salesForm.value.saleNo == null) {
      // get sale code when page reload
      this.saleService.getSaleCode().subscribe(res => {
        if (res?.length > 0) {
          this.loadSaleCode = res;
        }
      });
      console.log();
    }
    this.submitted = false;
  }

  addProduct(): void {
    this.productAdded = true;
    const ctrl = (this.salesForm.get('salesDetails') as FormArray);
    ctrl.push(this.addDetailsFormGroup());
  }
  mapFormValuesToFormModel(): void {
    this.detailsSale.customerId = this.salesForm.value.customerId;
    this.detailsSale.date = this.salesForm.value.date;
    this.detailsSale.saleNo = this.salesForm.value.saleNo;
    this.detailsSale.description = this.salesForm.value.description;
    this.detailsSale.salesDetails = this.salesForm.value.salesDetails;
  }
}
