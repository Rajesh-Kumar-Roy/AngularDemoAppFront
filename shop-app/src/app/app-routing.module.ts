import { PaymentTypeListComponent } from './Payments/payment-type-list/payment-type-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEntryComponent } from './Customers/customer-entry/customer-entry.component';
import { CustomerListComponent } from './Customers/customer-list/customer-list.component';
import { PaymentTypeEntryComponent } from './Payments/payment-type-entry/payment-type-entry.component';
import { ProductEntryComponent } from './Products/product-entry/product-entry.component';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { ProductTypeEntryComponent } from './Products/product-type-entry/product-type-entry.component';
import { ProductTypeListComponent } from './Products/product-type-list/product-type-list.component';
import { SalesEntryComponent } from './Sales/sale-entry/sales-entry.component';
import { SalesListComponent } from './Sales/sales-list/sales-list.component';
import { SalesViewComponent } from './Sales/sales-view/sales-view.component';

const routes: Routes = [
  { path: 'createProduct', component: ProductEntryComponent },
  { path: 'createProductType', component: ProductTypeEntryComponent },
  { path: 'Sales', component: SalesEntryComponent },
  { path: 'saleDetails', component: SalesListComponent },
  { path: 'customerList', component: CustomerListComponent },
  { path: 'edit/:id', component: CustomerEntryComponent },
  { path: 'productedit/:id', component: ProductEntryComponent },
  { path: 'typeEdit/:id', component: ProductTypeEntryComponent },
  { path: 'productList', component: ProductListComponent },
  { path: 'productTypeList', component: ProductTypeListComponent },
  { path: 'saleDetail/:id', component: SalesEntryComponent },
  { path: 'saleView/:id', component: SalesViewComponent },
  { path: 'createPaymentType', component: PaymentTypeListComponent },
  { path: 'paymentTypeEdit/:id', component: PaymentTypeEntryComponent },
  { path: '', redirectTo: '/productList', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
