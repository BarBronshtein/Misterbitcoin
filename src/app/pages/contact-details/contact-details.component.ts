import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(private contactService: ContactService) {}
  @Input() contactId!: string;
  contact!: Contact;
  subscription!: Subscription;

  ngOnInit(): void {
    this.contactService.getContactById(this.contactId).subscribe((contact) => {
      if (contact) this.contact = contact;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
