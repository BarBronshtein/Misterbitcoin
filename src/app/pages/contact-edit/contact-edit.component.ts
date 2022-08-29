import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactService } from 'src/app/services/contact.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private userMsgService: UserMsgService
  ) {}
  contact!: Contact;
  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact || this.contactService.getEmptyContact();
    });
  }

  async onSaveContact() {
    if (!this.contact.phone || !this.contact.email || !this.contact.name)
      return this.userMsgService.setUserMsg('Please fill all form fields');
    this.contact.name =
      this.contact.name[0].toUpperCase() + this.contact.name.slice(1);
    await lastValueFrom(this.contactService.saveContact({ ...this.contact }));
    this.router.navigateByUrl('/contact');
    this.userMsgService.setUserMsg(
      `Saved ${this.contact.name} contact to contact list`
    );
  }
}
