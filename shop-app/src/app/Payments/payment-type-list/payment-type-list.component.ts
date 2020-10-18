import { PaymentsService } from '../../Services/payment/payments.service';
import { PaymentType } from '../../Models/payment-models/paymentType';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.css']
})
export class PaymentTypeListComponent implements OnInit {

  paymentTypes: PaymentType[];
  constructor(private paymentTypeService: PaymentsService) { }

  ngOnInit(): void {
    this.paymentTypeService.getAll().subscribe((res: PaymentType[]) => {
      if (res.length > 0){
        this.paymentTypes = res;
      }
    });
  }

}
