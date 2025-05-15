import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { AttendeeListComponent } from './components/attendee-list/attendee-list.component';
import { AttendeeFormComponent } from './components/attendee-form/attendee-form.component';
import { AttendeeDetailComponent } from './components/attendee-detail/attendee-detail.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'events/create', component: EventFormComponent },
  {
    path: 'events/:id',
    component: EventDetailComponent,
    data: {
      getPrerenderParams: () => {
        return ['1', '2', '3', '4', '5'].map(id => ({ id }));
      }
    }
  },
  { path: 'events/:id/edit', component: EventFormComponent },
  { path: 'attendees', component: AttendeeListComponent },
  { path: 'attendees/create', component: AttendeeFormComponent },
  {
    path: 'attendees/:id',
    component: AttendeeDetailComponent,
    data: {
      getPrerenderParams: () => {
        return ['1', '2', '3', '4', '5'].map(id => ({ id }));
      }
    }
  },
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/create', component: TicketFormComponent },
  {
    path: 'tickets/:id',
    component: TicketDetailComponent,
    data: {
      getPrerenderParams: () => {
        return ['1', '2', '3', '4', '5'].map(id => ({ id }));
      }
    }
  }
];