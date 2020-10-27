import { SalesDetails } from 'src/app/Models/Sale-models/SaleDetails';
import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from './../../Services/payment/payments.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentOption } from 'src/app/Models/payment-models/paymentOption';
import { ActivationEnd, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-option-entry',
  templateUrl: './payment-option-entry.component.html',
  styleUrls: ['./payment-option-entry.component.css']
})
export class PaymentOptionEntryComponent implements OnInit {
  paymentOptions: PaymentOption;
  paymentOptionForm: FormGroup = null;
  $model: PaymentOption = null;
  showUpdateButton = false;
  showSaveButton = false;
  submitted = false;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAdd: EventEmitter<PaymentOption>;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.$model = new PaymentOption();
    this.onAdd = new EventEmitter<PaymentOption>();
  }

  ngOnInit(): void {
    this.paymentOptionForm = this.fb.group({
      name: [this.$model.name, Validators.required],
      description: [this.$model.description, Validators.maxLength(250)]
    });
    this.route.paramMap.subscribe(parms => {
      const pId = +parms.get('id');
      if (pId){
        this.showUpdateButton = true;
        this.getPaymentOption(pId);
      }
      else{
        this.showSaveButton = true;
        this.paymentOptions = {
          id: null,
          name: '',
          description: '',
          isDelete: false
        };
      }
    });
  }

  getPaymentOption(pId: number): void{
    this.paymentService.paymentOptionGetById(pId).subscribe(res => {
      this.editPaymentOption(res);
      this.paymentOptions = res;
    });
  }
  editPaymentOption(paymentOption: PaymentOption): void{
    this.paymentOptionForm.patchValue({
      name: paymentOption.name,
      description: paymentOption.description
    });
  }
  get ptyo(): any {
    return this.paymentOptionForm.controls;
  }
  // save New Payment Option
  onSave(): void {
    this.submitted = true;
    if (this.paymentOptionForm.invalid) {
      return;
    }
    this.mapModelFormValue();
    if (this.paymentOptions.id){
      this.paymentService.PaymentOptionUpdate(this.paymentOptions).subscribe( () => {
        this.toastr.info('Update Successfull', 'Payment Option');
        this.router.navigate(['paymentOptionList']);
      });
    }else{
      this.paymentService.PaymentOptionCreate(this.paymentOptionForm.value).subscribe(res => {
        this.toastr.success('Save Successfull', 'Payment Option');
        this.onAdd.emit(res);
        this.paymentOptionForm.reset();
        this.submitted = false;
      });
    }
  }
  mapModelFormValue(): void{
    this.paymentOptions.name = this.paymentOptionForm.value.name;
    this.paymentOptions.description = this.paymentOptionForm.value.description;


  }

}
