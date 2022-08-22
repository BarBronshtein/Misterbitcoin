import { Move } from './move.model';

export interface User {
  _id: string;
  moves: Move[];
  name: string;
  coins: number;
}
