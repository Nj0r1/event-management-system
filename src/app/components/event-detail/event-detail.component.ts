import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AttendeeService } from '../../services/attendee.service';
import { Event } from '../../models/event.model';
import { Attendee } from '../../models/attendee.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;
  attendees: Attendee[] = [];

  constructor(
    private eventService: EventService,
    private attendeeService: AttendeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Assume event ID is obtained from route or service
    this.event = this.eventService.getEvent(1); // Example ID
    this.attendees = this.attendeeService.getAttendees(this.event?.id);
  }

  getEventName(eventId: number): string {
    return this.eventService.getEvent(eventId)?.name || 'Unknown Event';
  }
}
