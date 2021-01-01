import { SalesDetails } from '../../Models/Sale-models/SaleDetails';
import { SalesDetailsService } from '../../Services/sales-details.service';
import { SalesService } from '../../Services/sales.service';
import { Component, OnInit } from '@angular/core';
import { Sales } from '../../Models/Sale-models/Sales';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales-llist',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
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
