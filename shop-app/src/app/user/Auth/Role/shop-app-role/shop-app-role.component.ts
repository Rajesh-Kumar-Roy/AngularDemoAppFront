import { ToastrService } from 'ngx-toastr';
import { RoleService } from './role.service';
import { RoleVm } from './models/RoleVm';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-app-role',
  templateUrl: './shop-app-role.component.html',
  styleUrls: ['./shop-app-role.component.css']
})
export class ShopAppRoleComponent implements OnInit {
  public roleForm: FormGroup;
  $Model: RoleVm = null;
  public submitted = false;

  constructor(private fb: FormBuilder, private _services: RoleService, private toastr: ToastrService) { 
    this.$Model = new RoleVm();
  }

  ngOnInit(): void {
    this.InitForm();
  
  }
  private InitForm(): void{
    this.roleForm = this.fb.group({
      roleName: [this.$Model.roleName, [Validators.required]]
    });
  }
  get p(): any{
    return this.roleForm.controls;
  }
  onAdd(): void{
    this.submitted = true;
    if(this.roleForm.invalid){
      return;
    }
    this._services.add(this.roleForm.value).subscribe( res =>{
      this.toastr.success("Save Successful", "Role");
    });
  }

}
