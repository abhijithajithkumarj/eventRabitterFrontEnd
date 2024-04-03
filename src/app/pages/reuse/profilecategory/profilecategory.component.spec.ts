import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecategoryComponent } from './profilecategory.component';

describe('ProfilecategoryComponent', () => {
  let component: ProfilecategoryComponent;
  let fixture: ComponentFixture<ProfilecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilecategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
