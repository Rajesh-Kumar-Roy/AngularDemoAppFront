import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../Models/Product-models/Product';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductServiceService } from '../../Services/product-service.service';
import { ProductType } from '../../Models/Product-models/productType';
import { ProductTypeService } from '../../Services/product-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {
  product: Product[];
  products: Product;
  public $model = null;

  productForm: FormGroup;
  submitted = false;
  isSuccess = false;
  showSave = false;
  showUpdate = false;

  public productType: ProductType[] = [];
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAdd: EventEmitter<Product>;
  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private productTypeService: ProductTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.onAdd = new EventEmitter<Product>();
    this.$model = new Product();
  }

  ngOnInit(): void {
    this.createForm();


    this.productTypeService.getAllisDeleteFalse().subscribe((res: ProductType[]) => {
      if (res.length > 0) {
        this.productType = res;
      }
    });
    // get route link
    this.route.paramMap.subscribe(parmas => {
      const pId = +parmas.get('id');
      if (pId) {
        this.showUpdate = true;
        this.getProduct(pId);
      } else {
        this.showSave = true;
        this.products = {
          id: null,
          name: '',
          price: null,
          code: '',
          description: '',
          productTypeId: null,
          isDelete: false
        };
      }
    });


  }
  createForm(): void {
    this.productForm = this.fb.group({
      name: [this.$model.name, Validators.required],
      price: [this.$model.price, Validators.required],
      code: [this.$model.code, Validators.required],
      productTypeId: [this.$model.productTypeId, Validators.required],
      description: [''],

    });
  }
  getProduct(id: number): void {
    this.productService.getById(id).subscribe(res => {
      this.products = res;
      this.editProduct(this.products);
    });
  }
  // edit product
  editProduct(products: Product): void {
    this.productForm.patchValue({
      name: products.name,
      price: products.price,
      code: products.code,
      description: products.description,
      productTypeId: products.productTypeId

    });
  }
  get p(): any {
    return this.productForm.controls;
  }
  onSave(): any {
    this.submitted = true;
    // stop if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    this.mapFormValuesToFormModel();

    // update product
    if (this.products.id) {
      this.productService.update(this.products).subscribe(() => {
        this.toastr.info('Update Successful', 'Product');
        this.router.navigate(['productList']);
      });
    } else {
      // save new product
      this.productService.create(this.productForm.value).subscribe(res => {
        this.isSuccess = true;
        if (this.isSuccess) {
          this.toastrShow();
        }
        // pass value to list if success
        this.onAdd.emit(res);
        this.cleanTextBox();

      });
    }

  }
  // show message for successfully create product
  // property set on appModules.ts
  toastrShow(): void {
    this.toastr.success('Save Successfull', 'Message');
  }

  // clean Text box
  cleanTextBox(): void {
    this.productForm.reset();
    this.submitted = false;

  }
  mapFormValuesToFormModel(): void {
    this.products.name = this.productForm.value.name;
    this.products.price = this.productForm.value.price;
    this.products.code = this.productForm.value.code;
    this.products.description = this.productForm.value.description;
    this.products.productTypeId = this.productForm.value.productTypeId;
  }

}
