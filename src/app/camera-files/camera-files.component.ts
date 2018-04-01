import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CameraService } from '../camera.service';
import { CameraFile } from './camera-file';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-camera-files',
  templateUrl: './camera-files.component.html',
  styleUrls: ['./camera-files.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CameraFilesComponent implements OnInit {

  cameraFiles = new MatTableDataSource();
  cameraFileImages : any[];
  displayedColumns = ['Image', 'File', 'Date'];

  constructor(private route: ActivatedRoute, private http: HttpClient
    , private service: CameraService, private Sanitization: DomSanitizer) { }

  ngOnInit() {
    this.getCameraFiles(this.route.snapshot.params['id']);
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
}