import { Component, OnInit, ViewEncapsulation,Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CameraService } from '../camera.service';
import { CameraFile } from './camera-file';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator, PageEvent} from '@angular/material'
import {CameraVideoComponent} from '../camera-video/camera-video.component'

@Component({
  selector: 'app-camera-files',
  templateUrl: './camera-files.component.html',
  styleUrls: ['./camera-files.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CameraFilesComponent implements OnInit, OnChanges {

  @Input() cameraId: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cameraFiles = new MatTableDataSource();
  cameraFileImages : any[];
  displayedColumns = ['Image', 'Date'];
  pageEvent : PageEvent;
  pageIndex : number;
  pageSize : number;

  constructor(private route: ActivatedRoute, private http: HttpClient
    , private service: CameraService, private Sanitization: DomSanitizer,
      public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cameraFiles.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "cameraId" changed
    if (changes['cameraId']) {
        this.paginator.pageIndex = 0;
        this.getCameraFiles(null);
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

  public getCameraFiles(event?:PageEvent) {
    if (event)
    {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.pageEvent = event;
    }
    this.service.getCameraFiles(this.cameraId)
      .subscribe(data => 
        {
          this.cameraFileImages = new Array(data.length);
          data.forEach((item, idx) => { 
            this.service.getCameraFileImage(item)
              .subscribe(img => 
                {
                  if (img.length > 0)
                  {
                    this.cameraFileImages[idx] = this.Sanitization.bypassSecurityTrustUrl(img);
                  }
                });
          });              
          this.cameraFiles.data = data
        })   
  }

  public openVideo(cameraFile : CameraFile)
  {
    this.service.getCameraFileVideo(cameraFile).subscribe(url => 
    {
      let dialogRef = this.dialog.open(CameraVideoComponent, {
        height: "90%",
        width: "90%",
        data: { 
          name : cameraFile.Date,
          videoUrl : url
        }        
      });
    })
  }
}