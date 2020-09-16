import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../Product';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductServiceService } from '../service/product-service.service';
import { ProductType } from '../Model/productType';
import { ProductTypeService } from '../service/product-type.service';
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
        this.getProduct(pId);
      } else {
        this.products = {
          id: null,
          name: '',
          price: null,
          description: '',
          productTypeId: null
        };
      }
    });


  }
  createForm(): void {
    this.productForm = this.fb.group({
      name: [this.$model.name, Validators.required],
      price: [this.$model.price, Validators.required],
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
    this.products.description = this.productForm.value.description;
    this.products.productTypeId = this.productForm.value.productTypeId;
  }

}
