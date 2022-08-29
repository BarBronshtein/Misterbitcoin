import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { Move } from 'src/app/models/move.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
})
export class MoveListComponent implements OnInit {
  constructor(private userService: UserService) {}

  @Input() contact!: Contact;
  @Input() user!: User;
  moves!: Move[];
  subscriber!: Subscription;
  ngOnInit(): void {
    this.getMoves();
  }

  getMoves() {
    if (this.contact?._id) this.moves = this.user.moves;
    else this.moves = this.user.moves.slice(-3).sort(() => -1);
  }

  // getMoves() {
  //   if (this.contact._id)
  //     this.moves = this.userService.getMoves(this.contact._id) as Move[];
  //   else this.moves = this.userService.getLastMoves() as Move[];
  //   return this.moves;
  // }

  getTransactions(contactId: string) {
    return this.user.moves.filter((move) => move.toId === contactId);
  }
  getLastTransactions(n: number = 3) {
    const moveLength = this.user.moves.length;
    return moveLength > 3
      ? this.user.moves.slice(moveLength - n).sort(() => -1)
      : this.user.moves.sort(() => -1);
  }
}
