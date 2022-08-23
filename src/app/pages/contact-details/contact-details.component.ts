import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  contact!: Contact;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
    // this.contactService.getContactById(this.contactId).subscribe((contact) => {
    //   if (contact) this.contact = contact;
  }

  // ngOnDestroy(): void {
  //   // this.subscription.unsubscribe();
  // }

  onBack() {
    this.router.navigateByUrl('/contact');
    // this.router.navigate(['/'])
  }
}
