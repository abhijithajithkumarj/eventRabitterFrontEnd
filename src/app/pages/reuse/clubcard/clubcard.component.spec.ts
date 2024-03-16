import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubcardComponent } from './clubcard.component';

describe('ClubcardComponent', () => {
  let component: ClubcardComponent;
  let fixture: ComponentFixture<ClubcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClubcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
