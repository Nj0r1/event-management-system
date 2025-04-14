import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendeeService } from '../../services/attendee.service';
import { EventService } from '../../services/event.service';
import { Attendee } from '../../models/attendee.model';
import { Event } from '../../models/event.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-attendee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendee-form.component.html',
  styles: []
})

export class AttendeeFormComponent implements OnInit {
  attendee: Attendee = { id: 0, fullName: '', email: '', eventId: 0 };
  events: Event[] = [];

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
    if (!this.events.length) {
      this.toastService.show('No events available. Please create an event first.');
      this.router.navigate(['/events/create']);
    }
  }

  isFormValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = !!(
      this.attendee.fullName?.trim() &&
      this.attendee.email?.trim() &&
      emailRegex.test(this.attendee.email) &&
      this.attendee.eventId > 0 &&
      this.eventService.getEvent(this.attendee.eventId)
    );
    console.log('Form Validation:', {
      fullName: this.attendee.fullName?.trim(),
      email: this.attendee.email?.trim(),
      emailValid: emailRegex.test(this.attendee.email),
      eventId: this.attendee.eventId,
      eventExists: !!this.eventService.getEvent(this.attendee.eventId)
    });
    return isValid;
  }

  onSubmit() {
    if (this.isFormValid()) {
      const newAttendee = { ...this.attendee };
      this.attendeeService.saveAttendee(newAttendee);
      this.toastService.show('Attendee registered successfully');
      this.attendee = { id: 0, fullName: '', email: '', eventId: 0 }; // Reset form
      this.router.navigate(['/attendees']);
    } else {
      this.toastService.show('Please fill all fields correctly.');
    }
  }
}