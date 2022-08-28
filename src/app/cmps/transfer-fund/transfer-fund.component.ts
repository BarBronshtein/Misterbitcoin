import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { User } from 'src/app/models/user.model';
import { UserMsgService } from 'src/app/services/user-msg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private userMsgService: UserMsgService
  ) {}
  amount: number = 1;
  user!: User;
  subscriber!: Subscription;
  inProcess: Boolean = false;
  @Input() contact!: Contact;

  ngOnInit(): void {
    this.subscriber = this.userService.user$.subscribe(
      (user) => (this.user = user as User)
    );
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  onTransferCoins() {
    if (this.inProcess) return;
    this.inProcess = true;
    if (this.amount > this.user.coins) {
      this.userMsgService.setUserMsg(
        'Insufficent balance please try again later'
      );
      return;
    }

    this.userService.addMove(this.contact, this.amount);
    this.userMsgService.setUserMsg(
      `Transfered ${this.amount} coins to ${this.contact.name}`
    );
    setTimeout(() => {
      this.inProcess = false;
    }, 0);
  }
}
