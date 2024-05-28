import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistreationComponent } from './event-registreation.component';

describe('EventRegistreationComponent', () => {
  let component: EventRegistreationComponent;
  let fixture: ComponentFixture<EventRegistreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegistreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
