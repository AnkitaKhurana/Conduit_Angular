import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutTabComponent } from './logged-out-tab.component';

describe('LoggedOutTabComponent', () => {
  let component: LoggedOutTabComponent;
  let fixture: ComponentFixture<LoggedOutTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedOutTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedOutTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
