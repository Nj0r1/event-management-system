import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AttendeeService } from '../../services/attendee.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})

export class TicketDetailComponent implements OnInit {
  ticket: Ticket | undefined;

  constructor(
    private ticketService: TicketService,
    private attendeeService: AttendeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticket = this.ticketService.getTicket(id);
  }

  getAttendeeName(attendeeId: number): string {
    const attendee = this.attendeeService.getAttendee(attendeeId);
    return attendee ? attendee.fullName : 'Unknown Attendee';
  }
}