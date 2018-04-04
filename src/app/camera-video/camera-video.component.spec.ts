import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraVideoComponent } from './camera-video.component';

describe('CameraVideoComponent', () => {
  let component: CameraVideoComponent;
  let fixture: ComponentFixture<CameraVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
