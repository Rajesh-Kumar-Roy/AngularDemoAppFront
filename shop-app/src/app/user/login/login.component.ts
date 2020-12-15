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
  constructor(private fb: FormBuilder, private router: Router) { }

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
  }

}
