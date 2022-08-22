import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user!: User;
  rate!: number;
  subscription!: Subscription;
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.loggedinUser;
    this.getRate();
  }

  getRate() {
    this.subscription = this.bitcoinService
      .getRate(this.user.coins)
      .subscribe((rate) => (this.rate = rate));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
