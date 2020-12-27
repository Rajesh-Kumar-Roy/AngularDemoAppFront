import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../Services/User/user.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.component.html',
  styleUrls: ['./registraion.component.css']
})
export class RegistraionComponent implements OnInit {
 formModel: FormGroup;
 submitted = false;
 public $model = null;

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) {
 
   }

  ngOnInit(): void {
    this.formModel = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.email, Validators.required]],
      PhoneNO: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(5)]],
        ConfirmPassword: ['', Validators.required]
      }, {validator: this.comparePasswords}),
    });
    this.formModel.reset();
  }
  get reg(): any{
    return this.formModel.controls;
  }
  // tslint:disable-next-line: typedef
  comparePasswords(fb: FormGroup){
    const confirmPasswordCtrl = fb.get('ConfirmPassword');
    if (confirmPasswordCtrl.errors == null || 'passwordMisMatch' in confirmPasswordCtrl.errors){
      if ( fb.get('Password').value != confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({passwordMisMatch: true});
      }
      else{
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.formModel.invalid) {
      return;
    }
    const body = {
      UserName:  this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      PhoneNo: this.formModel.value.PhoneNO,
      Password: this.formModel.value.Passwords.Password
    }
    
    this.userService.create(body).subscribe( (res: any) => {
      if (res.succeeded){
        this.toastr.success('New User Created', 'Registaration Successfull');
        this.router.navigateByUrl('/user/login');
        this.formModel.reset();
      }
      else{
        
        res.errors.forEach( element => {
          switch (element.code){
            case 'DuplicateUserName':
              this.toastr.error('User Name is already taken', 'Registration Failed!');
              break;
              default:
                this.toastr.error(element.discription, 'Registration Failed!');
                break;
          }
        });
      }
    });
  }
}
