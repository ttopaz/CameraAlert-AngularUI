import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraFilesComponent } from './camera-files.component';

describe('CameraFilesComponent', () => {
  let component: CameraFilesComponent;
  let fixture: ComponentFixture<CameraFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
