import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsVinComponent } from './what-is-vin.component';

describe('WhatIsVinComponent', () => {
  let component: WhatIsVinComponent;
  let fixture: ComponentFixture<WhatIsVinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatIsVinComponent]
    });
    fixture = TestBed.createComponent(WhatIsVinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
