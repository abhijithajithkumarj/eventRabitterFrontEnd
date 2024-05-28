import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfEventRabbiterComponent } from './chart-of-event-rabbiter.component';

describe('ChartOfEventRabbiterComponent', () => {
  let component: ChartOfEventRabbiterComponent;
  let fixture: ComponentFixture<ChartOfEventRabbiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartOfEventRabbiterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartOfEventRabbiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
