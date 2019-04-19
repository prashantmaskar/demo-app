import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeedbackComponent } from './project-feedback.component';

describe('ProjectFeedbackComponent', () => {
  let component: ProjectFeedbackComponent;
  let fixture: ComponentFixture<ProjectFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
