import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AttendeeService } from '../../services/attendee.service';
import { EventService } from '../../services/event.service';
import { Attendee } from '../../models/attendee.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-attendee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './attendee-list.component.html',
  styleUrl: './attendee-list.component.css'
  
})

export class AttendeeListComponent implements OnInit {
  attendees: Attendee[] = [];

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadAttendees();
  }

  loadAttendees() {
    this.attendees = this.attendeeService.getAttendees();
  }

  getEventName(eventId: number): string {
    const event = this.eventService.getEvent(eventId);
    if (!event) {
      console.warn(`Event with ID ${eventId} not found`);
      return 'Unknown Event';
    }
    return event.name;
  }

  deleteAttendee(id: number) {
    if (confirm('Are you sure you want to delete this attendee?')) {
      this.attendeeService.deleteAttendee(id);
      this.loadAttendees();
      this.toastService.show('Attendee deleted successfully');
    }
  }
}