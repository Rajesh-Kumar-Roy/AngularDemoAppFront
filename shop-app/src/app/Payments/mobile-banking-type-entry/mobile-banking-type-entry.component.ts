import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from './../../Services/payment/payments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MobileBankingType} from 'src/app/Models/payment-models/mobileBankingType';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-mobile-banking-type-entry',
  templateUrl: './mobile-banking-type-entry.component.html',
  styleUrls: ['./mobile-banking-type-entry.component.css']
})
export class MobileBankingTypeEntryComponent implements OnInit {
  mobileBankingTypeForm: FormGroup;
  $model: MobileBankingType = null;
  showUpdateButton = false;
  showSaveButton = false;
  submitted = false;
  mobileBankingType: MobileBankingType;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAdd: EventEmitter<MobileBankingType>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paymentService: PaymentsService,
    private toastr: ToastrService,
    private router: Router
    ) {
    this.$model = new MobileBankingType();
    this.onAdd = new EventEmitter<MobileBankingType>();
   }

  ngOnInit(): void {
    this.mobileBankingTypeForm = this.fb.group({
      name: [this.$model.name, Validators.required],
      description: [this.$model.description]
    });
    this.route.paramMap.subscribe(parms => {
      const mId = +parms.get('id');
      if (mId){
        this.showUpdateButton = true;
        this.getMobileBankingType(mId);
      }
      else{
        this.showSaveButton = true;
        this.mobileBankingType = {
          id: null,
          name: '',
          description: '',
          isDelete: false
        };
      }
    });
  }
  getMobileBankingType(mobileBankingId: number): void{
    this.paymentService.MobileBankingTypeGetById(mobileBankingId).subscribe( res => {
      this.mobileBankingType = res;
      this.editMobileBankingType(res);
    });
  }
  editMobileBankingType(moblieBanking: MobileBankingType): void{
    this.mobileBankingTypeForm.patchValue({
      name: moblieBanking.name,
      description: moblieBanking.description,
      isDelete: moblieBanking.isDelete
    });
  }

  get mbt(): any{
    return this.mobileBankingTypeForm.controls;
  }
  onSave(): void{
    this.submitted = true;
    if (this.mobileBankingTypeForm.invalid){
      return;
    }
    this.mapFromModel();
    // update Mobile Banking
    if (this.mobileBankingType.id){
      this.paymentService.MobileBankingTypeUpdate(this.mobileBankingType).subscribe( () => {
        this.toastr.info('Update Successfully', 'Mobile Banking');
        this.router.navigate(['mobileBankingList']);
      });
    }else{
      this.paymentService.MobileBankingTypeAdd(this.mobileBankingTypeForm.value).subscribe(res => {
        this.toastr.success('Save Successfully', 'Mobile Banking');
        this.onAdd.emit(res);
      });
      this.mobileBankingTypeForm.reset();
      this.submitted = false;
    }

  }
  mapFromModel(): void{
    this.mobileBankingType.name = this.mobileBankingTypeForm.value.name;
    this.mobileBankingType.description = this.mobileBankingTypeForm. value.description;
  }

}
