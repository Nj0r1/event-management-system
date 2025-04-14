import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {
  event: Event = { id: 0, name: '', location: '', date: '', capacity: 0 };

  constructor(
    private eventService: EventService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const existing = this.eventService.getEvent(id);
      if (existing) this.event = { ...existing };
    }
  }

  isFormValid(): boolean {
    return !!(this.event.name?.trim() && this.event.location?.trim() && this.event.date && this.event.capacity > 0);
  }

  formSubmitted = false;

  onSubmit() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.eventService.saveEvent({ ...this.event });
      this.toastService.show(`Event ${this.event.id ? 'updated' : 'created'} successfully`);
      this.router.navigate(['/events']);
      console.log('Form submitted:', this.event);
    }
  }
}