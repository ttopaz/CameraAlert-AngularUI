import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CameraLiveVideoComponent } from './camera-live-video/camera-live-video.component'
import { AboutComponent} from './about/about.component'
import { Camera } from './camera/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CameraService } from './camera.service';
declare var ActiveXObject;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public camera: Camera;

  title = 'app';

  constructor(private Sanitization: DomSanitizer, private service: CameraService, public dialog: MatDialog) 
  { 

  }

  protected hasLiveVideo() : boolean 
  {
    return this.camera != undefined && this.camera.LiveVideo != undefined && this.hasFlash();
  }
  

  private hasFlash() : boolean
  {
    return ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || ((<any>window).ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) != false));
  }

  public showLiveVideo()
  {
    this.service.startCameraLiveVideo(this.camera).subscribe(url => 
      {
        let dialogRef = this.dialog.open(CameraLiveVideoComponent, {
          height: "90%",
          width: "95%",
          data: { 
            url : this.camera.LiveVideo
          }        
        });
      })
   }
   public showAbout()
   {
        let dialogRef = this.dialog.open(AboutComponent, {
          height: "200px",
          width: "400px",
        });
    }
 }
