import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private key = 'tickets';

  constructor(private storage: StorageService) {}

  getTickets(): Ticket[] {
    return this.storage.getData<Ticket>(this.key);
  }

  getTicket(id: number): Ticket | undefined {
    return this.getTickets().find(t => t.id === id);
  }

  saveTicket(ticket: Ticket): void {
    const tickets = this.getTickets();
    if (ticket.id) {
      const index = tickets.findIndex(t => t.id === ticket.id);
      if (index >= 0) tickets[index] = ticket;
    } else {
      ticket.id = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
      tickets.push(ticket);
    }
    this.storage.setData(this.key, tickets);
  }

  deleteTicket(id: number): void {
    const tickets = this.getTickets().filter(t => t.id !== id);
    this.storage.setData(this.key, tickets);
  }
}