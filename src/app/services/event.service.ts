import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private key = 'events';

  constructor(private storage: StorageService) {}

  getEvents(): Event[] {
    return this.storage.getData<Event>(this.key);
  }

  getEvent(id: number): Event | undefined {
    const event = this.getEvents().find(e => e.id === id);
    if (!event) {
      console.warn(`No event found for ID ${id}`);
    }
    return event;
  }

  saveEvent(event: Event): void {
    const events = this.getEvents();
    if (event.id) {
      const index = events.findIndex(e => e.id === event.id);
      if (index >= 0) {
        events[index] = event;
      } else {
        console.warn(`Event ID ${event.id} not found during update`);
      }
    } else {
      event.id = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;
      events.push(event);
    }
    this.storage.setData(this.key, events);
  }

  deleteEvent(id: number): void {
    const events = this.getEvents().filter(e => e.id !== id);
    this.storage.setData(this.key, events);
  }
}