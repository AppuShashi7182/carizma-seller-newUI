import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWeWorkComponent } from './how-we-work.component';

describe('HowWeWorkComponent', () => {
  let component: HowWeWorkComponent;
  let fixture: ComponentFixture<HowWeWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowWeWorkComponent]
    });
    fixture = TestBed.createComponent(HowWeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
