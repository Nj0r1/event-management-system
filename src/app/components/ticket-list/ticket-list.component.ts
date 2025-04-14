import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AttendeeService } from '../../services/attendee.service';
import { Ticket } from '../../models/ticket.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})

export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(
    private ticketService: TicketService,
    private attendeeService: AttendeeService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.tickets = this.ticketService.getTickets();
  }

  getAttendeeName(attendeeId: number): string {
    const attendee = this.attendeeService.getAttendee(attendeeId);
    return attendee ? attendee.fullName : 'Unknown Attendee';
  }

  deleteTicket(id: number) {
    if (confirm('Are you sure you want to cancel this ticket?')) {
      this.ticketService.deleteTicket(id);
      this.loadTickets();
      this.toastService.show('Ticket cancelled successfully');
    }
  }
}