import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError, map } from 'rxjs';
import { ContactFilter, Contact } from '../models';

const CONTACTS = [
  {
    _id: '5a56640269f443a5d64b32ca',
    name: 'Ochoa Hyde',
    email: 'ochoahyde@renovize.com',
    phone: '+1 (968) 593-3824',
  },
  {
    _id: '5a5664025f6ae9aa24a99fde',
    name: 'Hallie Mclean',
    email: 'halliemclean@renovize.com',
    phone: '+1 (948) 464-2888',
  },
  {
    _id: '5a56640252d6acddd183d319',
    name: 'Parsons Norris',
    email: 'parsonsnorris@renovize.com',
    phone: '+1 (958) 502-3495',
  },
  {
    _id: '5a566402ed1cf349f0b47b4d',
    name: 'Rachel Lowe',
    email: 'rachellowe@renovize.com',
    phone: '+1 (911) 475-2312',
  },
  {
    _id: '5a566402abce24c6bfe4699d',
    name: 'Dominique Soto',
    email: 'dominiquesoto@renovize.com',
    phone: '+1 (807) 551-3258',
  },
  {
    _id: '5a566402a6499c1d4da9220a',
    name: 'Shana Pope',
    email: 'shanapope@renovize.com',
    phone: '+1 (970) 527-3082',
  },
  {
    _id: '5a566402f90ae30e97f990db',
    name: 'Faulkner Flores',
    email: 'faulknerflores@renovize.com',
    phone: '+1 (952) 501-2678',
  },
  {
    _id: '5a5664027bae84ef280ffbdf',
    name: 'Holder Bean',
    email: 'holderbean@renovize.com',
    phone: '+1 (989) 503-2663',
  },
  {
    _id: '5a566402e3b846c5f6aec652',
    name: 'Rosanne Shelton',
    email: 'rosanneshelton@renovize.com',
    phone: '+1 (968) 454-3851',
  },
  {
    _id: '5a56640272c7dcdf59c3d411',
    name: 'Pamela Nolan',
    email: 'pamelanolan@renovize.com',
    phone: '+1 (986) 545-2166',
  },
  {
    _id: '5a5664029a8dd82a6178b15f',
    name: 'Roy Cantu',
    email: 'roycantu@renovize.com',
    phone: '+1 (929) 571-2295',
  },
  {
    _id: '5a5664028c096d08eeb13a8a',
    name: 'Ollie Christian',
    email: 'olliechristian@renovize.com',
    phone: '+1 (977) 419-3550',
  },
  {
    _id: '5a5664026c53582bb9ebe9d1',
    name: 'Nguyen Walls',
    email: 'nguyenwalls@renovize.com',
    phone: '+1 (963) 471-3181',
  },
  {
    _id: '5a56640298ab77236845b82b',

    name: 'Glenna Santana',
    email: 'glennasantana@renovize.com',
    phone: '+1 (860) 467-2376',
  },
  {
    _id: '5a56640208fba3e8ecb97305',
    name: 'Malone Clark',
    email: 'maloneclark@renovize.com',
    phone: '+1 (818) 565-2557',
  },
  {
    _id: '5a566402abb3146207bc4ec5',
    name: 'Floyd Rutledge',
    email: 'floydrutledge@renovize.com',
    phone: '+1 (807) 597-3629',
  },
  {
    _id: '5a56640298500fead8cb1ee5',
    name: 'Grace James',
    email: 'gracejames@renovize.com',
    phone: '+1 (959) 525-2529',
  },
  {
    _id: '5a56640243427b8f8445231e',
    name: 'Tanner Gates',
    email: 'tannergates@renovize.com',
    phone: '+1 (978) 591-2291',
  },
  {
    _id: '5a5664025c3abdad6f5e098c',
    name: 'Lilly Conner',
    email: 'lillyconner@renovize.com',
    phone: '+1 (842) 587-3812',
  },
].sort((a, b) =>
  a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
);

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  //mock the server
  private _contactsDb: Contact[] = CONTACTS;

  constructor() {}

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable();

  private _filterBy$ = new BehaviorSubject<ContactFilter>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();

  public loadContacts(): void {
    const filterBy = this._filterBy$.getValue();
    let contacts = this._contactsDb;
    if (filterBy && filterBy.term) {
      contacts = this._filter(contacts, filterBy.term);
    }
    this._contacts$.next(this._sort(contacts));
  }

  public getContactById(id: string): Observable<Contact> {
    //mock the server work
    const contact = this._contactsDb.find((contact) => contact._id === id);

    //return an observable
    return contact
      ? of(contact)
      : throwError(() => `Contact id ${id} not found!`);
  }

  public setFilterBy(filterBy: ContactFilter) {
    this._filterBy$.next(filterBy);
    this.loadContacts();
  }

  public deleteContact(id: string) {
    //mock the server work
    this._contactsDb = this._contactsDb.filter((contact) => contact._id !== id);

    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._contactsDb);
  }

  public saveContact(contact: Contact) {
    return contact._id
      ? this._updateContact(contact)
      : this._addContact(contact);
  }

  private _updateContact(contact: Contact) {
    //mock the server work
    this._contactsDb = this._contactsDb.map((c) =>
      contact._id === c._id ? contact : c
    );
    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._sort(this._contactsDb));
  }

  private _addContact(contact: Contact) {
    //mock the server work
    const newContact = new Contact(contact.name, contact.email, contact.phone);
    if (typeof newContact.setId === 'function')
      newContact.setId(_getRandomId());
    this._contactsDb.push(newContact);
    this._contacts$.next(this._sort(this._contactsDb));
  }

  private _bubbleSort(contacts: Contact[]) {
    for (let i = contacts.length; i >= 0; i--) {
      let noSwaps = true;
      for (let j = 0; j < i - 1; j++) {
        if (contacts[j].name > contacts[j + 1].name) {
          _swap(contacts, j, j + 1);
          noSwaps = false;
        }
      }
      if (noSwaps) break;
    }
    return contacts;
  }

  private _sort(contacts: Contact[]): Contact[] {
    // TODO: sort using Bubble Sort for better perfomance
    return this._bubbleSort(contacts);
    // return contacts.sort((a, b) =>
    //   a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
    // );
  }

  private _filter(contacts: Contact[], term: string) {
    term = term.toLocaleLowerCase();
    return contacts.filter((contact: Contact) => {
      return (
        contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
      );
    });
  }
}

function _getRandomId(length = 8): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function _swap(arr: any, i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// TODO: create a better sorting algorithm using BubbleSort(when array is almost sorted Insertion and Bubble sorts perfrom almost to a linear time complexity;
// TODO: improve filter method efficentcy using Frequency counter using map object or Hash table
