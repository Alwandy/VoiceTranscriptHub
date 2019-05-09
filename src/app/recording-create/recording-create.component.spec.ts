import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingCreateComponent } from './recording-create.component';

describe('RecordingCreateComponent', () => {
  let component: RecordingCreateComponent;
  let fixture: ComponentFixture<RecordingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
