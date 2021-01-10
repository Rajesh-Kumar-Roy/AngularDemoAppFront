import { Router } from '@angular/router';
import { PaymentsService } from './../../Services/payment/payments.service';
import { PaymentOption } from 'src/app/Models/payment-models/paymentOption';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-option-list',
  templateUrl: './payment-option-list.component.html',
  styleUrls: ['./payment-option-list.component.css']
})
export class PaymentOptionListComponent implements OnInit {

  paymentOptions: PaymentOption[] = null;
  notFoundMess = false;
  deleteId = 0;
  constructor(private paymentService: PaymentsService,private router: Router) {
    this.paymentOptions = new Array();
  }

  ngOnInit(): void {
    this.paymentService.PaymentOptionGetAllFalseData().subscribe((res: PaymentOption[]) => {
      if (res?.length > 0) {
        this.paymentOptions = res;
      } else {
        // tslint:disable-next-line: no-unused-expression
        err => {
          this.notFoundMess = true;
          console.log('Can not Found Data!!');
        };
      }
    });
  }
  newPaymentOptionAdd(paymentOption: PaymentOption): void{
    this.paymentOptions.unshift(paymentOption);
  }
  deleteIdClick(id: any): void{
    this.deleteId = id;
    
  }
  onClickEditButton(id: PaymentOption): void{
    this.router.navigate(['/paymentOptionEdit', id]);

  }

}
