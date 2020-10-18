import { SalesDetails } from './../Model/SaleDetails';
import { SalesDetailsService } from '../service/sales-details.service';
import { SalesService } from './../service/sales.service';
import { Component, OnInit } from '@angular/core';
import { Sales } from '../Model/Sales';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {
  sale: Sales[];
  saledetail: SalesDetails[];
  constructor( private saleService: SalesService, private saleDetailsService: SalesDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.saleService.getAllisDeleteFase().subscribe(res => {
      if (res == null){
        // tslint:disable-next-line: no-unused-expression
        error => {
          console.log('something is worng!');
        };
      }
      this.sale = res;
    });
    this.saleDetailsService.getAllSaleDetail().subscribe(res => {
      if (res != null){
        this.saledetail = res;
      }
    });
  }
  onEditButtonClick(saleId: number): void{
    this.router.navigate(['/saleDetail', saleId]);
  }
  onViewButtonClick(saleId: number): void{
    this.router.navigate(['/saleView', saleId]);
  }

}
