import { PaymentsService } from '../../Services/payment/payments.service';
import { PaymentType } from '../../Models/payment-models/paymentType';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-type-entry',
  templateUrl: './payment-type-entry.component.html',
  styleUrls: ['./payment-type-entry.component.css']
})
export class PaymentTypeEntryComponent implements OnInit {
  paymentTForm: FormGroup = null;
  paymentType: PaymentType[];
  $model: PaymentType = null;
  submitted = false;
  constructor(private paymentTypeService: PaymentsService, private fb: FormBuilder, private toastr: ToastrService) {
    this.$model = new PaymentType();
  }

  ngOnInit(): void {
    this.paymentTForm = this.fb.group({
      name: [this.$model.name, Validators.required],
      description: [this.$model.description, Validators.maxLength(250)]
    });
  }
  get payt(): any {
    return this.paymentTForm.controls;
  }
  onSave() {
    this.submitted = true;
    if (this.paymentTForm.invalid) {
      return;
    }
    this.paymentTypeService.create(this.paymentTForm.value).subscribe(() => {
      this.toastr.success('Save Successful', 'Payment Type');
      this.paymentTForm.reset();
      this.submitted = false;
    });
  }

}
