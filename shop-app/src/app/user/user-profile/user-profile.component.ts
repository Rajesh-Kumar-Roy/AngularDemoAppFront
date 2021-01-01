import { UserService } from './../../Services/User/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor( private userService: UserService) { }
  userDetails: any;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(res=>{
      this.userDetails = res;
    },err=> {
      console.log(err);
    }
    );
  }

}
