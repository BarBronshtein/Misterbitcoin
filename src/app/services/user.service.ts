import { Injectable } from '@angular/core';
import { Move } from '../models/move.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY: string;
  constructor() {
    this.USER_KEY = 'loggedinUser';
  }

  public get loggedinUser() {
    return (
      JSON.parse(localStorage.getItem(this.USER_KEY) || 'null') || {
        name: 'Barry Allen',
        coins: 377,
        moves: [],
      }
    );
  }
  public set loggedinUser(user) {
    this.loggedinUser = user;
  }

  private signup(name: string) {
    this.loggedinUser = { name, coins: 100, moves: [] };
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.loggedinUser));
    return this.loggedinUser;
  }

  public getMoves(contactId: string) {
    return this.loggedinUser.moves.filter(
      (move: Move) => move.toId === contactId
    );
  }

  public getLastMoves(n: number = 3) {
    const startIdx = this.loggedinUser.moves.length - n;
    return this.loggedinUser.moves.slice(startIdx).sort(() => -1);
  }
}
