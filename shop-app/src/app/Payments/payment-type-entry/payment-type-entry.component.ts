import { Router, ActivatedRoute } from '@angular/router';
import { PaymentsService } from '../../Services/payment/payments.service';
import { PaymentType } from '../../Models/payment-models/paymentType';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-type-entry',
  templateUrl: './payment-type-entry.component.html',
  styleUrls: ['./payment-type-entry.component.css']
})
export class PaymentTypeEntryComponent implements OnInit {
  paymentTForm: FormGroup = null;
  paymentType: PaymentType;
  $model: PaymentType = null;
  submitted = false;
  showUpdateButton = false;
  showSaveButton = false;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAdd: EventEmitter<PaymentType>;
  constructor(
    private paymentTypeService: PaymentsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private rotue: ActivatedRoute) {

    this.$model = new PaymentType();
    this.onAdd = new EventEmitter<PaymentType>();
  }

  ngOnInit(): void {
    this.paymentTForm = this.fb.group({
      name: [this.$model.name, Validators.required],
      description: [this.$model.description, Validators.maxLength(250)]
    });
    // get Edit Payment Type Id
    this.rotue.paramMap.subscribe(prmas => {
      const ptId = +prmas.get('id');
      if (ptId){
        this.showUpdateButton = true;
        this.getPaymentType(ptId);
      }else{
        this.showSaveButton = true;
        this.paymentType = {
          id: null,
          name: '',
          description: '',
          isDelete: false
        };
      }
    });
  }
  get payt(): any {
    return this.paymentTForm.controls;
  }
  // get payment Type By Id
  getPaymentType(id: number): void{
    this.paymentTypeService.getById(id).subscribe(res => {
      this.paymentType = res;
      this.editPaymentType(res);
    });
  }
  // set value on text box
  editPaymentType(paymentType: PaymentType): void{
    this.paymentTForm.patchValue({
      name: paymentType.name,
      description: paymentType.description
    });
  }
  // Save Value
  onSave(): void {
    this.submitted = true;
    if (this.paymentTForm.invalid) { return; }
    this.mapFormValuesToFormModel();
    if (this.paymentType.id){
      this.paymentTypeService.update(this.paymentType).subscribe(() => {
        this.toastr.info('Update Successful', 'Payment Type');
        this.router.navigate(['createPaymentType']);
      });
    }else{
      this.paymentTypeService.create(this.paymentTForm.value).subscribe(res => {
        this.toastr.success('Save Successful', 'Payment Type');
        this.paymentTForm.reset();
        this.submitted = false;
        this.onAdd.emit(res);
      });
    }
  }
  mapFormValuesToFormModel(): void{
    this.paymentType.name = this.paymentTForm.value.name;
    this.paymentType.description = this.paymentTForm.value.description;
  }

}
