import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpEventComponent } from './set-up-event.component';

describe('SetUpEventComponent', () => {
  let component: SetUpEventComponent;
  let fixture: ComponentFixture<SetUpEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetUpEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetUpEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
