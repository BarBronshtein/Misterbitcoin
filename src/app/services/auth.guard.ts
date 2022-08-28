import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserMsgService } from './user-msg.service';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private userMsgService: UserMsgService
  ) {}
  canActivate(): boolean {
    if (!this.userService.getUser) {
      this.router.navigateByUrl('/signup');
      this.userMsgService.setUserMsg(
        'Not logged in please signup if you dont have an acoount'
      );
      return false;
    }
    return true;
  }
}
