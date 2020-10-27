import { Router } from '@angular/router';
import { PaymentsService } from '../../Services/payment/payments.service';
import { PaymentType } from '../../Models/payment-models/paymentType';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.css']
})
export class PaymentTypeListComponent implements OnInit {

  paymentTypes: PaymentType[] = null;
  notFoundMess = false;
  constructor(private paymentTypeService: PaymentsService, private router: Router) {
     this.paymentTypes = new Array();
   }

  ngOnInit(): void {
    this.paymentTypeService.getAllFalse().subscribe((res: PaymentType[]) => {
      if (res.length > 0){
        this.paymentTypes = res;
      }else{
        this.notFoundMess = true;
      }

    });
  }
  newPaymentTypeAdd(paymentType: PaymentType): void{
    this.notFoundMess = false;
    this.paymentTypes?.unshift(paymentType);
  }
  onEditButtonClick(paymentTypeId: number): void{
    this.router.navigate(['/paymentTypeEdit', paymentTypeId]);
  }

}
