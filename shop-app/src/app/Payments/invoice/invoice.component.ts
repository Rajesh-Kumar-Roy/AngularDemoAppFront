import { PaymentStatusEnum } from './../../Enums/PaymentStatusEnum';
import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from 'src/app/Services/payment/payments.service';
import { Payment } from './../../Models/payment-models/payment';
import { SalesService } from './../../Services/sales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesDetails } from 'src/app/Models/Sale-models/SaleDetails';
import { SalesDetailsService } from 'src/app/Services/sales-details.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  saleDetail: SalesDetails[];
  sale: any;
  vat: number;
  grandTotal: number;
  lastPayment: Payment;
  opId: string;
  showDue = false;
  saleId: any;
  paidShow = true;
  buttonHide = true;
  buttonPrint = false;
  dueAmountStatus: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saleService: SalesService,
    private saleDetailService: SalesDetailsService,
    private paymentService: PaymentsService,
    private toastr: ToastrService
     ) { }

  ngOnInit(): void {
    // get route link
    this.route.paramMap.subscribe(parms => {
      const sId = +parms.get('id');
      if (sId) {
        this.saleId = sId;
        this.getSale(sId);
      }
    });
    // get last payment row
    this.paymentService.getLastRow().subscribe(res => {
      this.lastPayment = res;
      this.checkOperation(this.lastPayment.operationId);
      this.checkDue(res.due);
    });
  }
  checkDue(due: any): void{
    if (due > 0){
      this.showDue = true;
      this.paidShow = false;
      this.dueAmountStatus = 'Due';
    }else{
      this.dueAmountStatus = 'Paid';
    }

  }
  checkOperation(operationId: any): void{
    if (operationId == 1){
      this.opId = 'Guide';
    }
    else if (operationId == 2){
      this.opId = 'Employee';
    }
    else if (operationId == 3){
      this.opId = 'Manager';
    }else{
      this.opId = 'N/A';
    }
  }
  getSale(id: number): void {
    this.saleService.getSaleBySaleId(id).subscribe(res => {
      if (res != null) {
        this.sale = res;
        this.saleDetailService.getDetailsBySaleId(res.id).subscribe(respon => {
          this.saleDetail = respon;
          this.getTotalPrice();
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
  onClickPaidButton(): void{
    this.saleService.PaymentStatus(this.saleId, PaymentStatusEnum.Paid).subscribe( res => {
      this.toastr.success('Save Successfull', 'Payment');
      // this.router.navigate(['Sales']);
      this.buttonHide = false;
      this.buttonPrint = true;
    });
  }
  onClickDueButton(): void{
    this.saleService.PaymentStatus(this.saleId, PaymentStatusEnum.Due).subscribe( res => {
      this.toastr.success('Save Successfull', 'Payment');
      this.buttonHide = false;
      this.buttonPrint = true;
      // this.router.navigate(['Sales']);
    });
  }
  onClickDraftButton(): void{
    this.saleService.PaymentStatus(this.saleId, PaymentStatusEnum.Draft).subscribe( res => {
      this.toastr.warning('Save to Draft', 'Payment');
      this.router.navigate(['Sales']);
    });
  }
  onClickRejectButton(): void{
    this.saleService.PaymentStatus(this.saleId, PaymentStatusEnum.Reject).subscribe( res => {
      this.toastr.error('Rejected', 'Payment');

      this.router.navigate(['Sales']);
    });
  }
  onClickPrintButton(): void{
    window.print();
    this.router.navigate(['Sales']);
  }

}
