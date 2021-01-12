import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-app-nav',
  templateUrl: './shop-app-nav.component.html',
  styleUrls: ['./shop-app-nav.component.css']
})
export class ShopAppNavComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    if (!localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  onLogOut(): void {

    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

  forLogIn() {
    this.router.navigate(['/user/login']);
  }

  logIn(): boolean {
    if (localStorage.getItem('token') == null) {
      return true;
    }
    return false;
  }

}
