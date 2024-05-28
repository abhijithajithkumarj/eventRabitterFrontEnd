import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAddMainPageComponent } from './image-add-main-page.component';

describe('ImageAddMainPageComponent', () => {
  let component: ImageAddMainPageComponent;
  let fixture: ComponentFixture<ImageAddMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageAddMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageAddMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
