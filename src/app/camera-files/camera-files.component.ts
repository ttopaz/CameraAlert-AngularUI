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
import { map, filter, scan, startWith, retry } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-camera-files',
  templateUrl: './camera-files.component.html',
  styleUrls: ['./camera-files.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CameraFilesComponent implements OnInit, OnChanges {
  @Input() cameraId: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cameraFiles : any[];
  cameraFilesPageData : any[];
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
  months = [];
  days = [];
  selectedMonth = "";
  selectedDay = null;

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

    this.months = [];
    this.months.push({Name:"Latest", Value:""});

    for(var i = 0; i < 12; i++)
    {
      let lineDate = new Date();
      lineDate.setMonth(lineDate.getMonth() - i);
      let value = lineDate.getFullYear() + "/" + lineDate.getMonth();
      this.months.push({Name:(lineDate.getMonth() + 1) + "/" + lineDate.getFullYear(), Value:value})
    }    

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
      return 26;
    } else if (cols === 2) {
      return 28;
    } else {
      return 30;
    }
  }

  colsToFontSize(cols: number): number {
    if (cols === 1) {
      return 1.1;
    } else if (cols === 2) {
      return 1.1;
    } else {
      return 1.2;
    }
  }

  ngAfterViewInit() {
    //this.cameraFiles.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "cameraId" changed
    if (changes['cameraId']) {
      this.selectedMonth = "";
      this.days = [];
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

  public monthChanged(value: String)
  {
    this.selectedMonth = value;
    this.days = [];
    if (this.selectedMonth.length)
    {
       var parts = value.split('/');
       var date = new Date(parseInt(parts[0]), parseInt(parts[1]) + 1, 0);
       var today = new Date();
       var endDay = date.getMonth() == today.getMonth() ? today.getDate() : date.getDate();
       for(var i = 1; i <= endDay; i++)
      {
        this.days.push({Name:i.toString(), Value:i})
      } 
      this.selectedDay = 1;
    }
    this.tableLoaded = false;
    this.getCameraFiles(null);        
  }

  public dayChanged(value: String)
  {
    this.selectedDay = value;
    this.tableLoaded = false;
    this.getCameraFiles(null);    
  }

  private updatePageData()
  {
    var start = this.pageIndex * this.pageSize;
    var end = Math.min(this.pageIndex * this.pageSize + this.pageSize, this.cameraFiles.length);
    this.cameraFilesPageData = this.cameraFiles.slice(start, end);
  }

  public getCameraFiles(event?:PageEvent) {
    if (event)
    {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.pageEvent = event;
      this.updatePageData();
      return;
    }
    var dateFilter = this.selectedMonth.length ? this.selectedMonth + "/" + this.selectedDay : null;
    this.service.getCameraFiles(this.cameraId, dateFilter)
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
          this.cameraFiles = data;
          this.tableLoaded = true;
          this.pageIndex = 0;
          this.pageSize = this.paginator.pageSize;
          this.paginator.pageIndex = 0;
          this.paginator.length = data.length;
          this.updatePageData();
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
     let today = this.datePipe.transform(new Date(), 'shortDate'); 
     let dateString = this.datePipe.transform(cameraFile.CreateTime, 'shortDate'); 
     return '<b>' + (today == dateString ? "Today" : dateString) + '</b> ' + 
     this.datePipe.transform(cameraFile.Date, 'mediumTime') + ' - ' + cameraFile.Name;
  }
}
