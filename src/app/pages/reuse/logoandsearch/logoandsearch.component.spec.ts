import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoandsearchComponent } from './logoandsearch.component';

describe('LogoandsearchComponent', () => {
  let component: LogoandsearchComponent;
  let fixture: ComponentFixture<LogoandsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoandsearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoandsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
