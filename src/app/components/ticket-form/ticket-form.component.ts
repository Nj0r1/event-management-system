import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AttendeeService } from '../../services/attendee.service';
import { Ticket } from '../../models/ticket.model';
import { Attendee } from '../../models/attendee.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})

export class TicketFormComponent implements OnInit {
  ticket: Ticket = { id: 0, attendeeId: 0, type: 'General' };
  attendees: Attendee[] = [];

  constructor(
    private ticketService: TicketService,
    private attendeeService: AttendeeService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.attendees = this.attendeeService.getAttendees();
    if (!this.attendees.length) {
      this.toastService.show('No attendees available. Please register an attendee first.');
      this.router.navigate(['/attendees/create']);
    }
  }

  isFormValid(): boolean {
    return !!(this.ticket.attendeeId && this.ticket.type);
  }

  formSubmitted = false;

  onSubmit() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.ticketService.saveTicket({ ...this.ticket });
      this.toastService.show('Ticket issued successfully');
      this.router.navigate(['/tickets']);
    }
  }
}