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
  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formModel = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.email, Validators.required]],
      PhoneNO: ['', Validators.required],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(4)]],
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
    this.userService.create(this.formModel.value).subscribe( (res: any) => {
      if (res.succeeded){
        this.formModel.reset();
        this.toastr.success('New User Created', 'Registaration Successfull');
      }else{
        res.errors.foreach( element => {
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
