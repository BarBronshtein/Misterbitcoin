import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { User } from 'src/app/models/user.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  user!: User;
  contact!: Contact;
  subscriber!: Subscription;
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
    this.subscriber = this.userService.user$.subscribe(
      (user) => (this.user = user as User)
    );
    // this.contactService.getContactById(this.contactId).subscribe((contact) => {
    //   if (contact) this.contact = contact;
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  onBack() {
    this.router.navigateByUrl('/contact');
    // this.router.navigate(['/'])
  }
}
