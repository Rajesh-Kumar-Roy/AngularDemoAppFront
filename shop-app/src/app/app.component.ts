import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-app';
  constructor(private router: Router){
  }
  loggedIn(): boolean {
     if(!localStorage.getItem('token')){
       return false;
     } 
     return true;
}
  onLogOut(): void{
    
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }
  forLogIn(){
    this.router.navigate(['/user/login']);
  }
  logIn(): boolean {
    if(localStorage.getItem('token')== null){
      return true;
    } 
    return false;
}
}
