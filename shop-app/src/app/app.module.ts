import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, NgForm} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEntryComponent } from './product-entry/product-entry.component';
import { ProductTypeEntryComponent } from './product-type-entry/product-type-entry.component';
import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { SalesMasterDetailsComponent } from './sales-master-details/sales-master-details.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerEntryComponent } from './customer-entry/customer-entry.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ToastrModule} from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductEntryComponent,
    ProductTypeEntryComponent,
    ProductTypeListComponent,
    SalesMasterDetailsComponent,
    SalesDetailsComponent,
    CustomerEntryComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-top-center',

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
