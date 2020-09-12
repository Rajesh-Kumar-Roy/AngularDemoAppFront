import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import{Product} from '../Product';
import{FormGroup,FormControl,FormBuilder,Validators} from'@angular/forms';
import {ProductServiceService} from '../service/product-service.service';
import{ProductType} from '../Model/productType'
import { ProductTypeService } from '../service/product-type.service';
import{ActivatedRoute,Router}from '@angular/router'

@Component({
  selector: 'product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {
  product: Product[];
  products: Product;
  
  productForm: FormGroup;
  submitted = false;
  isSuccess: boolean =false;
  
  public productType: ProductType[] =[];
  @Output() onAdd: EventEmitter<Product>;
  constructor(private fb: FormBuilder,private productService: ProductServiceService,private productTypeService: ProductTypeService,private route: ActivatedRoute,private router: Router) {
    this.onAdd = new EventEmitter<Product>();
   }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['',Validators.required],
      price:['',Validators.required],
      productTypeId:['',Validators.required],
      description:[''],

    });
    this.productTypeService.getAll().subscribe((res: ProductType[])=>{
      if(res.length>0){
        this.productType= res;
      }
    });
    //get route link
    this.route.paramMap.subscribe(parmas=>{
      const pId = +parmas.get('id');
      if(pId){
        this.getProduct(pId);
      }else{
        this.products={
          id: null,
          name:'',
          price: null,
          description: '',
          productTypeId: null
        };
      }
    });

    
  }
  getProduct(id: number){
    this.productService.getById(id).subscribe(res=>{
      this.products = res;
      this.editProduct(this.products);
    })
  }
  //edit product
  editProduct(products: Product){
    this.productForm.patchValue({
      name: products.name,
      price: products.price,
      description: products.description,
      productTypeId: products.productTypeId
      
    });
  }
  get p(){
    return this.productForm.controls;
  }
  onSave(){
     this.submitted =true;
     //stop if form is invalid
     if(this.productForm.invalid){
       return;
     }
     this.mapFormValuesToFormModel();

     //update product
     if(this.products.id){
         this.productService.update(this.products).subscribe(()=>{
         this.router.navigate(['productList']);
       })
     }else {
       //save new product
              this.productService.create(this.productForm.value).subscribe(res=>{
              this.isSuccess =true;
              //pass value to list if success
              this.onAdd.emit(res);
              
            });
     }
  
  }
  mapFormValuesToFormModel(){
    this.products.name = this.productForm.value.name;
    this.products.price = this.productForm.value.price;
    this.products.description = this.productForm.value.description;
    this.products.productTypeId = this.productForm.value.productTypeId;
  }

}
