import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateDetailsComponent } from './event-create-details.component';

describe('EventCreateDetailsComponent', () => {
  let component: EventCreateDetailsComponent;
  let fixture: ComponentFixture<EventCreateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCreateDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCreateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
});
