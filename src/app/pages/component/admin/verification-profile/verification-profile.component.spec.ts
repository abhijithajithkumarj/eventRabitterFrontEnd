import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationProfileComponent } from './verification-profile.component';

describe('VerificationProfileComponent', () => {
  let component: VerificationProfileComponent;
  let fixture: ComponentFixture<VerificationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
