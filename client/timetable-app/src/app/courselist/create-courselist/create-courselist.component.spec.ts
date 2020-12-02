import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourselistComponent } from './create-courselist.component';

describe('CreateCourselistComponent', () => {
  let component: CreateCourselistComponent;
  let fixture: ComponentFixture<CreateCourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCourselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
