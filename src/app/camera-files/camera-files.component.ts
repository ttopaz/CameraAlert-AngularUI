import { Component, OnInit, ViewEncapsulation,Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CameraService } from '../camera.service';
import { CameraFile } from './camera-file';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator, PageEvent} from '@angular/material'
import {CameraVideoComponent} from '../camera-video/camera-video.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { map, filter, scan, startWith } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-camera-files',
  templateUrl: './camera-files.component.1.html',
  styleUrls: ['./camera-files.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CameraFilesComponent implements OnInit, OnChanges {

  @Input() cameraId: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cameraFiles = new MatTableDataSource();
  cameraFilesData : any[];
  cameraFileImages : any[];
  displayedColumns = ['Image', 'Date'];
  pageEvent : PageEvent;
  pageIndex : number;
  pageSize : number;
  tableLoaded : boolean;
  cols: Observable<number>;
  rowHeight : number;
  fontSize : number;
  datePipe : DatePipe = new DatePipe('en-us');

  constructor(private route: ActivatedRoute, private http: HttpClient
    , private service: CameraService, private Sanitization: DomSanitizer,
      public dialog: MatDialog, private observableMedia: ObservableMedia) { }

  ngOnInit() {
    const grid = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 4],
      ['lg', 4],
      ['xl', 4]
    ]);

    let start: number;

    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });

    // on breakpoint, assign cols AND ROW HEIGHT appropriately
    this.cols = this.observableMedia.asObservable().pipe(
      map((change: MediaChange) => {

        this.rowHeight = this.colsToHeight(grid.get(change.mqAlias));
        this.fontSize = this.colsToFontSize(grid.get(change.mqAlias));
        return grid.get(change.mqAlias);

      }), startWith(start));
  }

  colsToHeight(cols: number): number {
    if (cols === 1) {
      return 250;
    } else if (cols === 2) {
      return 300;
    } else {
      return 350;
    }
  }

  colsToFontSize(cols: number): number {
    if (cols === 1) {
      return 1.2;
    } else if (cols === 2) {
      return 1.4;
    } else {
      return 1.6;
    }
  }

  ngAfterViewInit() {
    this.cameraFiles.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "cameraId" changed
    if (changes['cameraId']) {
      this.tableLoaded = false;
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
          this.cameraFiles.data = data;
          this.cameraFilesData = data;
          this.tableLoaded = true;
  //        this.paginator.pageIndex = 0;
        })   
  }

  public openVideo(cameraFile : CameraFile)
  {
    this.service.getCameraFileVideo(cameraFile).subscribe(url => 
    {
      let dialogRef = this.dialog.open(CameraVideoComponent, {
        height: "auto",
        width: "95%",
        data: { 
          title : this.getCameraFileTitle(cameraFile),
          videoUrl : url
        },
        panelClass : "no-padding-dialog"
      });
    })
  }

  public getCameraFileTitle(cameraFile : CameraFile) : string 
  {
     return this.datePipe.transform(cameraFile.CreateTime, 'shortDate') + ' ' + 
     this.datePipe.transform(cameraFile.Date, 'mediumTime') + ' ' + cameraFile.Name;
  }
}