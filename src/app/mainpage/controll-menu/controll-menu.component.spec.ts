import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllMenuComponent } from './controll-menu.component';

describe('ControllMenuComponent', () => {
  let component: ControllMenuComponent;
  let fixture: ComponentFixture<ControllMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControllMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
