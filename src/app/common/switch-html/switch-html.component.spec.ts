import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchHtmlComponent } from './switch-html.component';

describe('SwitchHtmlComponent', () => {
  let component: SwitchHtmlComponent;
  let fixture: ComponentFixture<SwitchHtmlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchHtmlComponent]
    });
    fixture = TestBed.createComponent(SwitchHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
