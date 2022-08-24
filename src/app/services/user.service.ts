import { Injectable } from '@angular/core';
import { Contact } from '../models';
import { Move } from '../models/move.model';
import { getRandomId } from './contact.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY: string;

  constructor() {
    this.USER_KEY = 'loggedinUser';
  }

  public get loggedinUser() {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
  }

  public logout() {
    localStorage.setItem(this.USER_KEY, 'null');
  }

  public addMove(contact: Contact, amount: number) {
    return this._addMove(contact, amount);
  }

  public signup(name: string) {
    return this._signup(name);
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

  private _signup(name: string) {
    const user = { name, coins: 100, moves: [], _id: getRandomId() };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return this.loggedinUser;
  }

  private _addMove(contact: Contact, amount: number) {
    const user = this.loggedinUser;
    if (user.coins - amount < 0) return;
    user.coins -= amount;

    const move = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount,
    };
    user.moves.push(move);
    return user;
  }
}
