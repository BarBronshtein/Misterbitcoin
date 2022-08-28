import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models';
import { Move } from '../models/move.model';
import { User } from '../models/user.model';
import { getRandomId } from './contact.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY: string = 'loggedinUser';
  constructor() {}

  private _user$ = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem(this.USER_KEY) || 'null')
  );
  public user$ = this._user$.asObservable();

  public logout() {
    localStorage.setItem(this.USER_KEY, 'null');
    this._user$.next(null);
  }

  public addMove(contact: Contact, amount: number) {
    return this._addMove(contact, amount);
  }

  public signup(name: string) {
    return this._signup(name);
  }

  public get getUser() {
    return this._user$.value;
  }

  public getMoves(contactId: string) {
    return this._user$.value?.moves.filter(
      (move: Move) => move.toId === contactId
    );
  }

  public getLastMoves(n: number = 3) {
    const user = this._user$.value;
    if (!user) return;
    const startIdx = user.moves.length - n;
    return user.moves.length > 3
      ? user.moves.slice(startIdx).sort(() => -1)
      : user.moves.sort(() => -1);
  }

  private _signup(name: string) {
    const user = { name, coins: 100, moves: [], _id: getRandomId() };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return this._user$.next(user);
  }

  private _addMove(contact: Contact, amount: number) {
    if (!this._user$.value) return;
    const updatedUser = { ...this._user$.value };
    updatedUser.coins -= amount;
    const move = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount,
    };
    updatedUser.moves.push(move as Move);
    this._user$.next(updatedUser);
  }
}
