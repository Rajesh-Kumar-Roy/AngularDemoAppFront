import { Component, Input, OnInit } from '@angular/core';
import { ProductTypeService } from '../../Services/product-type.service';
import { ProductType } from '../../Models/Product-models/productType';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})
export class ProductTypeListComponent implements OnInit {
  productType: ProductType[];
  @Input() productTypes: ProductType;
  constructor(private productTypeService: ProductTypeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productTypeService.getAllisDeleteFalse().subscribe(response => {
      if (response == null) {
        alert('Something went wrong!');
      }
      this.productType = response;
      console.log(this.productTypes + 'show' );
    });
  }
  addNewProductType(): void{
    this.productType.push(this.productTypes);
  }
  onEditButtonClick(typeId: number): void{
    this.router.navigate(['/typeEdit', typeId]);
  }
  onDeleteproductTypeClick(typeId: number): void {
    this.productTypeService.deleteProductType(typeId).subscribe(() => {
      this.featchData();
    });
  }
  featchData(): void {
    this.toastr.error('Delete Successfull', 'Message');
    this.productTypeService.getAllisDeleteFalse().subscribe(res => {
      this.productType = res;
    });
  }


}
