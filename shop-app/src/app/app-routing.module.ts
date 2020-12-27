import { HomeComponent } from './home/home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserComponent } from './user/user/user.component';
import { RegistraionComponent } from './user/registraion/registraion.component';
import { LoginComponent } from './user/login/login.component';
import { InvoiceComponent } from './Payments/invoice/invoice.component';
import { PaymentEntryComponent } from './Payments/payment-entry/payment-entry.component';
import { MobileBankingTypeListComponent } from './Payments/mobile-banking-type-list/mobile-banking-type-list.component';
import { MobileBankingTypeEntryComponent } from 'src/app/Payments/mobile-banking-type-entry/mobile-banking-type-entry.component';
import { PaymentOptionListComponent } from 'src/app/Payments/payment-option-list/payment-option-list.component';
import { PaymentOptionEntryComponent } from './Payments/payment-option-entry/payment-option-entry.component';
import { PaymentTypeListComponent } from './Payments/payment-type-list/payment-type-list.component';
import { NgModule, Component } from '@angular/core';
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
import { AuthGuard}  from 'src/app/auth/auth.guard';

const routes: Routes = [
  { path: 'createProduct', component: ProductEntryComponent },
  { path: 'createProductType', component: ProductTypeEntryComponent },
  { path: 'Sales', component: SalesEntryComponent },
  { path: 'saleDetails', component: SalesListComponent },
  { path: 'customerList', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: CustomerEntryComponent },
  { path: 'productedit/:id', component: ProductEntryComponent },
  { path: 'typeEdit/:id', component: ProductTypeEntryComponent },
  { path: 'productList', component: ProductListComponent },
  { path: 'productTypeList', component: ProductTypeListComponent },
  { path: 'saleDetail/:id', component: SalesEntryComponent },
  { path: 'saleView/:id', component: SalesViewComponent },
  { path: 'createPaymentType', component: PaymentTypeListComponent },
  { path: 'paymentTypeEdit/:id', component: PaymentTypeEntryComponent },
  { path: 'paymentOptionEntry', component: PaymentOptionEntryComponent },
  { path: 'paymentOptionList', component: PaymentOptionListComponent },
  { path: 'paymentOptionEdit/:id', component: PaymentOptionEntryComponent },
  { path: 'mobileBankingEdit/:id', component: MobileBankingTypeEntryComponent },
  { path: 'mobileBankingList', component: MobileBankingTypeListComponent },
  { path: 'paymentEntry', component: PaymentEntryComponent },
  { path: 'paymentPay/:id', component: PaymentEntryComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistraionComponent }
    ]
  },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
