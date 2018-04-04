import { Component, OnInit, ViewEncapsulation,Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CameraService } from '../camera.service';
import { CameraFile } from './camera-file';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CameraVideoComponent} from '../camera-video/camera-video.component'

@Component({
  selector: 'app-camera-files',
  templateUrl: './camera-files.component.html',
  styleUrls: ['./camera-files.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CameraFilesComponent implements OnInit, OnChanges {

  @Input() cameraId: string;

  cameraFiles = new MatTableDataSource();
  cameraFileImages : any[];
  displayedColumns = ['Image', 'Date'];

  constructor(private route: ActivatedRoute, private http: HttpClient
    , private service: CameraService, private Sanitization: DomSanitizer,
      public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "cameraId" changed
    if (changes['cameraId']) {
        this.getCameraFiles(this.cameraId);
    }
}

  ngOnDestroy() {
    this.cameraFileImages.forEach(element => {
      if (element)
      {
        URL.revokeObjectURL(element);
      }
    });
  }

  private getCameraFiles(id) {
    this.service.getCameraFiles(id)
      .subscribe(data => 
        {
          this.cameraFileImages = new Array(data.length);
          data.forEach((item, idx) => { 
            this.service.getCameraFileImage(id, item.File)
              .subscribe(img => this.cameraFileImages[idx] 
                = this.Sanitization.bypassSecurityTrustUrl(img));
          });              
          this.cameraFiles.data = data
        })          
  }

  public openVideo(cameraFile : CameraFile)
  {
    let dialogRef = this.dialog.open(CameraVideoComponent, {
      height: "90%",
      width: "90%",
      data: { 
        name : cameraFile.Date.toLocaleString(),
        videoUrl : "http://192.168.1.80:3500/PlayCameraFile?Id=" + this.cameraId + "&File=" + cameraFile.File
      }        
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}