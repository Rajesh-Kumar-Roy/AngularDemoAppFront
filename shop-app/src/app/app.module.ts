import { AuthModule } from './user/Auth/auth.module';
import { UserService } from './Services/User/user.service';
import { ProductTypeListComponent } from './Products/product-type-list/product-type-list.component';
import { CustomerListComponent } from './Customers/customer-list/customer-list.component';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { SalesViewComponent } from './Sales/sales-view/sales-view.component';
import { CommonModule } from '@angular/common';
import { PaymentTypeEntryComponent } from './Payments/payment-type-entry/payment-type-entry.component';
import { ProductEntryComponent } from './Products/product-entry/product-entry.component';
import { PaymentTypeListComponent } from './Payments/payment-type-list/payment-type-list.component';
import { ProductTypeEntryComponent } from './Products/product-type-entry/product-type-entry.component';
import { CustomerEntryComponent } from './Customers/customer-entry/customer-entry.component';
import { SalesEntryComponent } from './Sales/sale-entry/sales-entry.component';
import { SalesListComponent } from './Sales/sales-list/sales-list.component';
import { PaymentOptionEntryComponent } from 'src/app/Payments/payment-option-entry/payment-option-entry.component';
import { PaymentOptionListComponent } from 'src/app/Payments/payment-option-list/payment-option-list.component';
import { MobileBankingTypeEntryComponent } from './Payments/mobile-banking-type-entry/mobile-banking-type-entry.component';
import { MobileBankingTypeListComponent } from './Payments/mobile-banking-type-list/mobile-banking-type-list.component';
import { PaymentEntryComponent } from './Payments/payment-entry/payment-entry.component';
import { InvoiceComponent } from './Payments/invoice/invoice.component';
import { RegistraionComponent } from './user/registraion/registraion.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user/user.component';
import { UserProfileComponent } from '../app/user/user-profile/user-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home/home.component';
import { AuthInterceptor } from 'src/app/auth/auth.Interceptor';
import { ForbiddenComponent } from './user/forbidden/forbidden.component';
import { AdminPanelComponent } from './user/admin-panel/admin-panel.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DropdownModule } from 'angular-bootstrap-md';
import { DeleteModelComponent } from './home/delete-model/delete-model.component';
import { ShopAppNavComponent } from './Shop-app-Nav-footer/shop-app-nav/shop-app-nav.component';
import { ShopAppFooterComponent } from './Shop-app-Nav-footer/shop-app-footer/shop-app-footer.component';
import { ShopAppRoleComponent } from './user/Auth/Role/shop-app-role/shop-app-role.component';
import { ForgetPasswordComponent } from './user/Auth/ForgetPassword/forget-password/forget-password.component';
import { ResetPasswordComponent } from './user/Auth/ResetPassword/reset-password/reset-password.component';
import { AuthService } from './user/Auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductEntryComponent,
    ProductTypeEntryComponent,
    ProductTypeListComponent,
    SalesEntryComponent,
    SalesListComponent,
    CustomerEntryComponent,
    CustomerListComponent,
    SalesViewComponent,
    PaymentTypeEntryComponent,
    PaymentTypeListComponent,
    PaymentOptionEntryComponent,
    PaymentOptionListComponent,
    MobileBankingTypeEntryComponent,
    MobileBankingTypeListComponent,
    PaymentEntryComponent,
    InvoiceComponent,
    RegistraionComponent,
    LoginComponent,
    UserComponent,
    UserProfileComponent,
    HomeComponent,
    ForbiddenComponent,
    AdminPanelComponent,
    DeleteModelComponent,
    ShopAppNavComponent,
    ShopAppFooterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    FormsModule,
    NgSelectModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-top-center',

    }),
    CommonModule,
    NgxPaginationModule,
    DropdownModule,
    AuthModule,
  ],
  providers: [
    HttpClientModule, UserService,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
       multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
