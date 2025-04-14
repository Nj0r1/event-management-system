import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeFormComponent } from './attendee-form.component';

describe('AttendeeFormComponent', () => {
  let component: AttendeeFormComponent;
  let fixture: ComponentFixture<AttendeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
