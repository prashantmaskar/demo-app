import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatesFeedbackComponent } from './associates-feedback.component';

describe('AssociatesFeedbackComponent', () => {
  let component: AssociatesFeedbackComponent;
  let fixture: ComponentFixture<AssociatesFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatesFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatesFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
