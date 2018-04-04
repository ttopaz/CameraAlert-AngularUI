import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CameraVideoComponent} from './camera-video/camera-video.component'
import { Camera } from './camera/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  camera: Camera;

  title = 'app';

  constructor(private Sanitization: DomSanitizer, public dialog: MatDialog) { }

  public showLiveVideo()
  {
    let dialogRef = this.dialog.open(CameraVideoComponent, {
      height: "90%",
      width: "90%",
      data: { 
        videoUrl : this.Sanitization.bypassSecurityTrustUrl(this.camera.LiveIp)
      }        
    });
  }
}
