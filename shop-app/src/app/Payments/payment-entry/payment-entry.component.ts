import { ToastrService } from 'ngx-toastr';
import { PaymentType } from './../../Models/payment-models/paymentType';
import { MonthEnum } from './../../Enums/MonthEnum';
import { MobileBankingType } from './../../Models/payment-models/mobileBankingType';
import { SalesDetailsService } from './../../Services/sales-details.service';
import { SalesDetails } from 'src/app/Models/Sale-models/SaleDetails';
import { SalesService } from './../../Services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from 'src/app/Services/payment/payments.service';
import { Payment } from './../../Models/payment-models/payment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PaymentOption} from 'src/app/Models/payment-models/paymentOption';
import {FormsModule} from '@angular/forms';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';



@Component({
  selector: 'app-payment-entry',
  templateUrl: './payment-entry.component.html',
  styleUrls: ['./payment-entry.component.css']
})
export class PaymentEntryComponent implements OnInit {
  submitted = false;
  paymetMethodForm: FormGroup;
  showCardDetail = false;
  showMobileBankingDetail = false;
  showCheckDetail = false;
  sowCashDetail = false;
  showAlert = true;
  $model: Payment = null;
  paymentOption: PaymentOption[];
  nrSelect: any;
  sale: any;
  saleDetail: SalesDetails[];
  vat: any;
  grandTotal: number;
  mobileBankingTypes: MobileBankingType[];
  showDue = false;
  dueTo: number;
  monthEnum = MonthEnum;
  keys = [];
  paymentType: PaymentType[];

  // tslint:disable-next-line: max-line-length
  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentsService,
    private route: ActivatedRoute,
    private saleService: SalesService,
    private saleDetailService: SalesDetailsService,
    private toastr: ToastrService
    )
    {
    this.$model = new Payment();
    this.keys = Object.keys(this.monthEnum).filter(f => !isNaN(Number(f)));
   }

  ngOnInit(): void {
    this.paymetMethodForm = this.fb.group({
      amount: [this.$model.amount, Validators.required],
      vatAmount: [this.$model.vatAmount, Validators.required],
      pay: [this.$model.pay, Validators.required],
      paymentDate: [this.$model.paymentDate, Validators.required],
      duePaymentDate: [this.$model.paymentDate],
      due: [this.$model.due],

      paymentOptionId: [this.$model.paymentOptionId, Validators.required],

      mobBankTypeId: [this.$model.mobBankTypeId],
      mobileBankingNo: [this.$model.mobileBankingNo, Validators.pattern('^((\\+88-?)|0)?[0-9]{11}$')],
      mobBankRefNo: [this.$model.mobBankRefNo],

      bankName: [this.$model.bankName],
      checkNo: [this.$model.checkNo],
      checkIssueDate: [this.$model.checkIssueDate],

      cardNo: [this.$model.cardNo, Validators.maxLength(16)],
      cardEndMonth: [this.$model.cardEndMonth],
      cardEndYear: [this.$model.cardEndYear],
      cVVNo: [this.$model.cVVno, Validators.maxLength(4)],
      cardHolderName: [this.$model.cardHolderName],

      paymentTypeId: [this.$model.paymentTypeId,Validators.required],
      operationId: [this.$model.operationId],
      operationBy: [this.$model.operationId],
      isDelete: [this.$model.isDetele]

    });

      // get route link
    this.route.paramMap.subscribe(parms => {
        const sId = +parms.get('id');
        if (sId) {
          this.getSale(sId);
        }
      });
    this.paymentService.PaymentOptionGetAllFalseData().subscribe(res => {
      this.paymentOption = res;
      this.paymentOptionDefaultSet();
    });
    this.paymentService.MobileBankingTypeGetAllFalseData().subscribe(res => {
      this.mobileBankingTypes = res;
    });
    this.paymentService.getAllFalse().subscribe (res => {
      this.paymentType  = res;
    });
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
    console.log(this.grandTotal);
    return total;
  }
  checkDue(event): void{
    if ( this.grandTotal == event.target.value){
       this.showDue = false;
       this.paymetMethodForm.patchValue({
        due: 0
       });
    }else{
      this.dueTo = this.grandTotal - event.target.value;
      this.showDue = true;
    }
  }
  get pty(): any{
    return this.paymetMethodForm.controls;
  }
// only for year Picker
  onOpenCalendarYear(container): any {

    container.setViewMode('year');

    container.yearSelectHandler = (event: CalendarCellViewModel): void => {

    container.value =  event.date;

    return;
};
}




  paymentOptionDefaultSet(): any{
    this.paymentOption.forEach(e => {
      if (e.name.toLocaleUpperCase() == 'Card'){
        this.nrSelect = e.id;
      }
    });
  }
  changingEvent(id: number): void{
    if (id ==1){
      this.sowCashDetail = true;
      this.showMobileBankingDetail = false;
      this.showCheckDetail = false;
      this.showCardDetail = false;
      this.showAlert = true;
    }
    else if (id == 2){
      this.showMobileBankingDetail = true;
      this.showCheckDetail = false;
      this.showCardDetail = false;
      this.sowCashDetail = false;
      this.showAlert = false;
    }
    else if (id == 3){
      this.showCheckDetail = true;
      this.showCardDetail = false;
      this.sowCashDetail = false;
      this.showMobileBankingDetail = false;
      this.showAlert = false;
    }
    else if ( id == 4){
      this.showCardDetail = true;
      this.sowCashDetail = false;
      this.showMobileBankingDetail = false;
      this.showCheckDetail = false;
      this.showAlert = false;
    }
    else{
      console.log('please Check Data properly!!');
    }
  }
  onSave(): void{
    this.submitted = true;
    if (this.paymetMethodForm.invalid){
      return;
    }
    console.log(this.paymetMethodForm.value);
    this.paymentService.PaymentCreate(this.paymetMethodForm.value).subscribe( res => {
      this.toastr.success('Save Successfull', 'Payment');
      this.paymetMethodForm.reset();
      this.submitted = false;
    });
  }
}
