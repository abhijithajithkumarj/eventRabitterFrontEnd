import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBookingPageCardsComponent } from './event-booking-page-cards.component';

describe('EventBookingPageCardsComponent', () => {
  let component: EventBookingPageCardsComponent;
  let fixture: ComponentFixture<EventBookingPageCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventBookingPageCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventBookingPageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
