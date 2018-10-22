import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInTabComponent } from './logged-in-tab.component';

describe('LoggedInTabComponent', () => {
  let component: LoggedInTabComponent;
  let fixture: ComponentFixture<LoggedInTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedInTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
