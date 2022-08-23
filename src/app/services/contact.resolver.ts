import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactResolver implements Resolve<Observable<Contact>> {
  constructor(private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    const id = route.params?.['id'];
    return id && this.contactService.getContactById(id);
  }
}
