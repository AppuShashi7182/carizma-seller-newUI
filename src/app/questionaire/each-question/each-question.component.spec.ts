import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachQuestionComponent } from './each-question.component';

describe('EachQuestionComponent', () => {
  let component: EachQuestionComponent;
  let fixture: ComponentFixture<EachQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EachQuestionComponent]
    });
    fixture = TestBed.createComponent(EachQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
