import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-app',
  templateUrl: './contact-app.component.html',
  styleUrls: ['./contact-app.component.scss'],
})
export class ContactAppComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  contacts!: Contact[];
  contacts$!: Observable<Contact[]>;

  selectedContactId!: string;

  ngOnInit(): void {
    this.contactService.loadContacts();
    this.contacts$ = this.contactService.contacts$;
  }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId);
  }

  onSelectContactId(contactId: string) {
    this.selectedContactId = contactId;
  }
}
