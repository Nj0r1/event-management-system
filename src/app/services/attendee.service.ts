import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Attendee } from '../models/attendee.model';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {
  private key = 'attendees';

  constructor(private storage: StorageService) {}

  getAttendees(eventId?: number): Attendee[] {
    const attendees = this.storage.getData<Attendee>(this.key);
    return eventId ? attendees.filter(a => a.eventId === eventId) : attendees;
  }

  getAttendee(id: number): Attendee | undefined {
    return this.getAttendees().find(a => a.id === id);
  }

  saveAttendee(attendee: Attendee): void {
    const attendees = this.getAttendees();
    if (attendee.id) {
      const index = attendees.findIndex(a => a.id === attendee.id);
      if (index >= 0) attendees[index] = attendee;
    } else {
      attendee.id = attendees.length ? Math.max(...attendees.map(a => a.id)) + 1 : 1;
      attendees.push(attendee);
    }
    this.storage.setData(this.key, attendees);
  }

  deleteAttendee(id: number): void {
    const attendees = this.getAttendees().filter(a => a.id !== id);
    this.storage.setData(this.key, attendees);
  }
}