import { Component, OnInit } from '@angular/core';
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
  productAdded = false;
  products: Product[];
  unitPriceByProductId: number;
  productByType: Product[];
  productType: ProductType[];
  totalPrice: number;
  unqDate: string;
  customerCodeValue: any;
  getSaleCode: string;
  success = false;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private saleService: SalesService,
    private productService: ProductServiceService,
    private productTypeService: ProductTypeService,
    private salesDetailsService: SalesDetailsService
  ) {
    this.$Model = new Sales(); this.$DetailModel = new SalesDetails();
    this.unqDate = `S-${Date.now().toString()}`;

  }


  ngOnInit(): void {
    this.salesForm = this.fb.group({
      customerName: [this.$Model.customerName, Validators.required],
      date: [this.$Model.date, Validators.required],
      saleNo: [this.$Model.saleNo],
      description: [this.$Model.description, Validators.maxLength(250)],
      details: this.fb.array([
        this.addDetailsFormGroup()
      ])
    });
    this.salesDetailsService.getAll().subscribe((response => {
      if (response.length > 0) {
        this.salesDetails = response;
      }
    }));
    this.productService.getAll().subscribe((res: Product[]) => {
      if (res.length > 0) {
        this.products = res;
      }
    });
    this.productTypeService.getAll().subscribe((res: ProductType[]) => {
      if (res.length > 0) {
        this.productType = res;
      }
    });


  }
  get Sel(): any {
    return this.salesForm.controls;
  }
  addDetailsFormGroup(): FormGroup {
    return this.fb.group({
      productTypeId: [this.$DetailModel.productTypeId, Validators.required],
      productId: [this.$DetailModel.productId, Validators.required],
      unitPrice: [this.$DetailModel.unitPrice, Validators.required],
      qty: [this.$DetailModel.qty, Validators.required],
      totalPrice: [this.$DetailModel.totalPrice, Validators.required],
      description: [this.$DetailModel.description, Validators.maxLength(100)]
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
    const detailsFormArray = ( this.salesForm.get('details') as FormArray);
    detailsFormArray.removeAt(detailsIndex);
    detailsFormArray.markAsDirty();
    detailsFormArray.markAsUntouched();
  }
  ChangeSelectedValue($event): any {
    this.productService.getProductByTypeId(($event.target.value)).subscribe((res: Product[]) => {
      if (res.length > 0) {
        this.productByType = res;
      }
    });
  }
  // get unit price by product id
  changeProductSelectValue($event): void {
    this.salesDetailsService.getPriceByProductId($event.target.value).subscribe(res => {
      this.unitPriceByProductId = res;
    });
  }
  // get qty
  onKey(event): any {
    return this.totalPrice = this.unitPriceByProductId * event.target.value;

  }
  // Find Customer Name and Sales  Code
  findCustomer(event): any {
    this.customerService.getNameByCustomerCode(event.target.value).subscribe(res => {
      this.customerCodeValue = res;
    });
  }
  // Save Value
  onSaveSale(): any {
    this.submitted = true;
    if (this.salesForm.invalid) {
      return;
    }
    console.log('save button');
    this.saleService.create(this.salesForm.value).subscribe(() => {
      this.success = true;
    });
  }
  addProduct(): void {
    this.productAdded = true;
    ( this.salesForm.get('details') as FormArray).push(this.addDetailsFormGroup());
  }
  productLoop(): any {
    this.products.forEach((value1) => value1.id);
  }


}
