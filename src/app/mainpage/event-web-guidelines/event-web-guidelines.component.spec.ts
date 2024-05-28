import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWebGuidelinesComponent } from './event-web-guidelines.component';

describe('EventWebGuidelinesComponent', () => {
  let component: EventWebGuidelinesComponent;
  let fixture: ComponentFixture<EventWebGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventWebGuidelinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventWebGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
