import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-app';
  buttonHide = false;
  constructor(private router: Router){
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl("#");
      this.buttonHide = true;
      
    }
  }
  onLogOut(): void{
    
    localStorage.removeItem('token');
    this.buttonHide = false;
    this.router.navigateByUrl('/user/login');
  }
}
