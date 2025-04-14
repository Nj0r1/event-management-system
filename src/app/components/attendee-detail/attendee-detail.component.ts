import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AttendeeService } from '../../services/attendee.service';
import { EventService } from '../../services/event.service';
import { Attendee } from '../../models/attendee.model';

@Component({
  selector: 'app-attendee-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './attendee-detail.component.html',
  styleUrl: './attendee-detail.component.css'
})

export class AttendeeDetailComponent implements OnInit {
  attendee: Attendee | undefined;

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.attendee = this.attendeeService.getAttendee(id);
  }

  getEventName(eventId: number): string {
    const event = this.eventService.getEvent(eventId);
    if (!event) {
      console.warn(`Event with ID ${eventId} not found`);
      return 'Unknown Event';
    }
    return event.name;
  }
}