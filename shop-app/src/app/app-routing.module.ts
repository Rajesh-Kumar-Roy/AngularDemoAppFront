
import { PaymentType } from './Model/paymentModel/paymentType';
import { SalesViewComponent } from './sales-details/sales-view/sales-view.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEntryComponent } from './product-entry/product-entry.component';
import { ProductTypeEntryComponent } from './product-type-entry/product-type-entry.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { SalesMasterDetailsComponent } from './sales-master-details/sales-master-details.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEntryComponent } from './customer-entry/customer-entry.component';
import { PaymentTypeListComponent } from './paymentMethod/payment-type-list/payment-type-list.component';

const routes: Routes = [
  { path: 'createProduct', component: ProductEntryComponent },
  { path: 'createProductType', component: ProductTypeEntryComponent },
  { path: 'Sales', component: SalesMasterDetailsComponent },
  {path: 'saleDetails', component: SalesDetailsComponent},
  { path: 'customerList', component: CustomerListComponent },
  { path: 'edit/:id', component: CustomerEntryComponent },
  { path: 'productedit/:id', component: ProductEntryComponent },
  { path: 'typeEdit/:id', component: ProductTypeEntryComponent },
  { path: 'productList', component: ProductListComponent },
  { path: 'productTypeList', component: ProductTypeListComponent },
  { path: 'saleDetail/:id', component: SalesMasterDetailsComponent},
  { path: 'saleView/:id', component: SalesViewComponent},
  {path: 'createPaymentType', component: PaymentTypeListComponent},

  { path: '', redirectTo: '/productList', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
