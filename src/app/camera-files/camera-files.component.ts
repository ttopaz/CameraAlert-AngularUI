import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraService } from '../camera.service';
import { CameraFile } from './camera-file';

@Component({
  selector: 'app-camera-files',
  templateUrl: './camera-files.component.html',
  styleUrls: ['./camera-files.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CameraFilesComponent implements OnInit {

  cameraFiles : CameraFile[];
  cameraFileImages : any;

  constructor(private route: ActivatedRoute, private http: HttpClient
    , private service: CameraService, private Sanitization: DomSanitizer) { }

  ngOnInit() {
    this.getCameraFiles(this.route.snapshot.params['id']);
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
          this.cameraFiles = data
        })          
  }
}