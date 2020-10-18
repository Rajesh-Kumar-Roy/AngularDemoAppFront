import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductType } from '../../Models/Product-models/productType';
import { ProductTypeService } from '../../Services/product-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-type-entry',
  templateUrl: './product-type-entry.component.html',
  styleUrls: ['./product-type-entry.component.css']
})
export class ProductTypeEntryComponent implements OnInit {
  public $model = null;
  productType: ProductType[];
  productTypeForm: FormGroup;
  submitted = false;
  isSuccess = false;
  ptTypes: ProductType;
  passProuductTypeValue: ProductType;
  showSave = false;
  showUpdate = false;

  constructor(
    private fb: FormBuilder,
    private productTypeService: ProductTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.$model = new ProductType();
  }

  ngOnInit(): void {
    this.productTypeForm = this.fb.group({
      name: [this.$model.name, Validators.required],
      code: [this.$model.code, Validators.required],
      description: [this.$model.description]
    });
    // get Route link
    this.route.paramMap.subscribe(parmas => {
      const ptId = +parmas.get('id');
      if (ptId) {
        this.showUpdate = true;
        this.getProductType(ptId);
      } else {
        this.showSave = true;
        this.ptTypes = {
          id: null,
          name: '',
          code: '',
          description: ''
        };
      }

    });
  }
  get pt(): any {
    return this.productTypeForm.controls;
  }
  onSubmit(): any {
    this.submitted = true;
    // stop if form is invalid
    if (this.productTypeForm.invalid) {
      return;
    }
    this.mapFormValuesToFormModel();
    if (this.ptTypes.id) {
      this.productTypeService.update(this.ptTypes).subscribe(() => {
        this.toastr.info('Update Succesfull', 'Message');
        this.router.navigate(['productTypeList']);
      });
    } else {
      // create new Product Type
      this.productTypeService.create(this.productTypeForm.value).subscribe(res => {
        this.isSuccess = true;
        this.passProuductTypeValue = res;
        if (this.isSuccess) {
          // show message for successfully create product
          // toastr property set on appModules.ts
          this.toastr.success('Save Successfull', 'Message');
        }
        this.featch();
      });
      this.CleanTextBox();
    }

  }
   passProductType(): ProductType{
     return this.passProuductTypeValue;
   }
  // refresh data and clear text box
  featch(): void{
    console.log(this.passProductType());
  }
  // clean text box
  CleanTextBox(): void {
    this.productTypeForm.reset();
    this.submitted = false;
  }
  // get product by Id
  getProductType(id: number): void {
    this.productTypeService.getById(id).subscribe(res => {
      this.ptTypes = res;
      this.editProductType(this.ptTypes);
    });
  }

  // edit product Type
  editProductType(ptType: ProductType): void{
    this.productTypeForm.patchValue({
      name: ptType.name,
      code: ptType.code,
      description: ptType.description
    });
  }

  mapFormValuesToFormModel(): void {
    this.ptTypes.name = this.productTypeForm.value.name;
    this.ptTypes.code = this.productTypeForm.value.code;
    this.ptTypes.description = this.productTypeForm.value.description;
  }

}
