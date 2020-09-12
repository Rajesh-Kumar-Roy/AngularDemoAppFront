import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import{ FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ProductType} from '../Model/productType';
import { ProductTypeService } from '../service/product-type.service';
import{ActivatedRoute,Router} from '@angular/router'

@Component({
  selector: 'product-type-entry',
  templateUrl: './product-type-entry.component.html',
  styleUrls: ['./product-type-entry.component.css']
})
export class ProductTypeEntryComponent implements OnInit {
public $model = null;
  productType: ProductType[]; 
productTypeForm: FormGroup;
submitted = false;
isSuccess: boolean = false;
ptTypes: ProductType;

  constructor(private fb: FormBuilder,private productTypeService: ProductTypeService,private route: ActivatedRoute,private router: Router) { 
   this.$model = new ProductType();
  }

  ngOnInit(): void {
    this.productTypeForm = this.fb.group({
      name:[this.$model.name,Validators.required],
      code: [this.$model.code,Validators.required],
      description: [this.$model.description]
    });
       //get Route link
       this.route.paramMap.subscribe(parmas=>{
        const ptId = +parmas.get('id');
         if(ptId){
           this.getProductType(ptId);
         }else{
           this.ptTypes ={
             id: null,
             name: '',
             code:'',
             description: ''
           };
         }
 
      });
  }
  get pt(){
    return this.productTypeForm.controls;
  }
  onSubmit(){
    this.submitted =true;
     //stop if form is invalid
     if(this.productTypeForm.invalid){
       return;
     }
     this.mapFormValuesToFormModel();
     if(this.ptTypes.id){
       this.productTypeService.update(this.ptTypes).subscribe(()=>{
         this.router.navigate(['productTypeList']);
       })
     }else{
         this.productTypeService.create(this.productTypeForm.value).subscribe(res=>{
       this.isSuccess =true;
       this.featch();
       err=>{
         console.log("something worng!!");
       }
     });
     }
   
  }
  //refresh data and clear text box
  featch(){
    this.productTypeService.getAll().subscribe(response=>{
      if(response == null){
        err => {
          alert('Something went wrong!');
        }
      }
      this.productType=response;
    });
  }
  //get product by Id 
  getProductType(id: number){
    this.productTypeService.getById(id).subscribe(res=>{
      this.ptTypes = res;
      this.editProductType(this.ptTypes);
    });
  }

  //edit product Type
  editProductType(ptType: ProductType){
    this.productTypeForm.patchValue({
      name: ptType.name,
      code: ptType.code,
      description: ptType.description
    });
  }

  mapFormValuesToFormModel(){
    this.ptTypes.name = this.productTypeForm.value.name;
    this.ptTypes.code = this.productTypeForm.value.code;
    this.ptTypes.description = this.productTypeForm.value.description;
  }

}
