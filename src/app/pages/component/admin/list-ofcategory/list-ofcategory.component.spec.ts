import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfcategoryComponent } from './list-ofcategory.component';

describe('ListOfcategoryComponent', () => {
  let component: ListOfcategoryComponent;
  let fixture: ComponentFixture<ListOfcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
