import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class MoveListComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  @Input() contact!: Contact;
  user!: User;
  moves!: Move[];
  subscriber!: Subscription;
  ngOnInit(): void {
    this.subscriber = this.userService.user$.subscribe(
      (user) => (this.user = user as User)
    );
    this.getMoves();
  }

  getMoves() {
    if (this.contact)
      this.moves = this.userService.getMoves(
        this.contact._id as string
      ) as Move[];
    else this.moves = this.userService.getLastMoves() as Move[];
    return this.moves;
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
