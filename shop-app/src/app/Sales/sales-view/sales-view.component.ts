import { SalesDetailsService } from '../../Services/sales-details.service';
import { SalesService } from '../../Services/sales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesDetails } from '../../Models/Sale-models/SaleDetails';
import { PaymentStatusEnum } from 'src/app/Enums/PaymentStatusEnum';


@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.css']
})
export class SalesViewComponent implements OnInit {
  sale: any;
  saleDetail: SalesDetails[];
  vat: any;
  grandTotal: number;
  paymentEnum = PaymentStatusEnum;
  // tslint:disable-next-line: max-line-length
  constructor(
    private saleService: SalesService,
    private saleDetailService: SalesDetailsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // get route link
    this.route.paramMap.subscribe(parms => {
      const sId = +parms.get('id');
      if (sId) {
        this.getSale(sId);
      }
    });
  }
  getSale(id: number): void {
    this.saleService.getSaleBySaleId(id).subscribe(res => {
      if (res != null) {
        this.sale = res;
        this.saleDetailService.getDetailsBySaleId(res.id).subscribe(respon => {
          this.saleDetail = respon;
        });
      }
    });
  }
  getTotalPrice(): number {
    let total = 0;
    this.saleDetail?.forEach(t => {
      total += t.totalPrice;
    });
    this.vat = (total * 5) / 100;
    this.grandTotal = total + this.vat;
    return total;
  }

  onEditButtonClick(saleId: number): void {
    this.router.navigate(['/saleDetail', saleId]);
  }
  onPaymentClick(saleId: number): void{
    this.router.navigate(['/paymentPay', saleId]);
  }

}
