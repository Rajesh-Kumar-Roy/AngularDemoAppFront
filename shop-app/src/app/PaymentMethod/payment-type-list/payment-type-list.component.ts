import { Component, OnInit } from '@angular/core';
import {PaymentType} from 'src/app/Model/paymentModel/paymentType';
import { PaymentService } from 'src/app/PaymentMethod/service/payment.service';

@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.css']
})
export class PaymentTypeListComponent implements OnInit {

  paymentTypes: PaymentType[];
  constructor(private paymentTypeService: PaymentService) { }

  ngOnInit(): void {
    this.paymentTypeService.getAll().subscribe((res: PaymentType[]) => {
      if (res.length > 0){
        this.paymentTypes = res;
      }
    });
  }

}
