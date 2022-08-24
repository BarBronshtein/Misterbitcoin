import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private userService: UserService, private router: Router) {}
  name: string = '';
  signup() {
    this.userService.signup(this.name);
    this.router.navigateByUrl('/');
  }
}
