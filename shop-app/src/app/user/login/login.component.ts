import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../Services/User/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 logInForm: FormGroup;
 submitted = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.router.navigateByUrl('/profile');
    }
    this.logInForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get log(): any{
    return this.logInForm.controls;
  }
  onSubmit(): void{
    this.submitted = true;
    if (this.logInForm.invalid){
      return;
    }
    
    this.userService.createUserLogin(this.logInForm.value).subscribe((res: any) =>{
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/profile');
    },
    err =>{
      if(err.status == 400){
        this.toastr.error("User Name or Password Incorrect!!", "Authentication Failed!!");
      }
    }
    );
  }

}
