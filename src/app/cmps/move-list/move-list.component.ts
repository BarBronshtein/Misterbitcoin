import { Component, Input, OnInit } from '@angular/core';
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

  @Input() contact!: Contact | undefined;
  user!: User;
  moves!: Move[];
  ngOnInit(): void {
    this.user = this.userService.loggedinUser;
    if (this.contact)
      this.moves = this.userService.getMoves(this.contact._id as string);
    else this.moves = this.userService.getLastMoves();
  }
}
