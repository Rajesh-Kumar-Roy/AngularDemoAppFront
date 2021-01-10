import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/Services/payment/payments.service';
import { MobileBankingType } from './../../Models/payment-models/mobileBankingType';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-banking-type-list',
  templateUrl: './mobile-banking-type-list.component.html',
  styleUrls: ['./mobile-banking-type-list.component.css']
})
export class MobileBankingTypeListComponent implements OnInit {

  mobileBankingType: MobileBankingType[];
  deleteId = 0;
  constructor(private paymentService: PaymentsService, private router: Router) {
    this.mobileBankingType = new Array();
   }

  ngOnInit(): void {
    this.paymentService.MobileBankingTypeGetAllFalseData().subscribe( (res: MobileBankingType[]) => {
      this.mobileBankingType = res;
    });
  }
  onClickEditButton(id: number): void{
    this.router.navigate(['/mobileBankingEdit', id]);
  }
  deleteIdClick(id: any): void{
    this.deleteId = id;
    
  }
  // add New Mobile banking
  newMobileBankingAdd(moblieBanking: MobileBankingType): void{
    this.mobileBankingType.unshift(moblieBanking);
  }

}
