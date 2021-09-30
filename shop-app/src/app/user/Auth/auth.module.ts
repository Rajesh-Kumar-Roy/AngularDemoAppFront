import { RoleService } from './Role/shop-app-role/role.service';
import { AuthService } from './auth.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './ForgetPassword/forget-password/forget-password.component';
import { ResetPasswordComponent } from './ResetPassword/reset-password/reset-password.component';
import { ShopAppRoleComponent } from './Role/shop-app-role/shop-app-role.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ 
    ShopAppRoleComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [RoleService]
})
export class AuthModule {

 }
