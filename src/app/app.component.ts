import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CameraLiveVideoComponent} from './camera-live-video/camera-live-video.component'
import { Camera } from './camera/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CameraService } from './camera.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  camera: Camera;

  title = 'app';

  constructor(private Sanitization: DomSanitizer, private service: CameraService, public dialog: MatDialog) { }

  public showLiveVideo()
  {
    this.service.startCameraLiveVideo(this.camera).subscribe(url => 
      {
        let dialogRef = this.dialog.open(CameraLiveVideoComponent, {
          height: "90%",
          width: "90%",
          data: { 
            url : "test"
          }        
        });
      })
   }
}
