import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraLiveVideoComponent } from './camera-live-video.component';

describe('CameraLiveVideoComponent', () => {
  let component: CameraLiveVideoComponent;
  let fixture: ComponentFixture<CameraLiveVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraLiveVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraLiveVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
