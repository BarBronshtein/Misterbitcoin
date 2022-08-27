import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models';
import { User } from 'src/app/models/user.model';
import { UserMsgService } from 'src/app/services/user-msg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userMsgService: UserMsgService
  ) {}
  amount: number = 0;
  user!: User;
  @Input() contact!: Contact;
  ngOnInit(): void {
    this.user = this.userService.loggedinUser;
  }
  onTransferCoins() {
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
  }
}
