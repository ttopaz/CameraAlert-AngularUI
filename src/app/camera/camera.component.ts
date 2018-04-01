import { Component, OnInit } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from '../camera.service';
import { Camera } from './camera';

import {MatTableDataSource, MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  cameras = []
  cameraId: string;
  
  constructor(private http: HttpClient, private router: Router
    , private route: ActivatedRoute, private service: CameraService) { }

  ngOnInit() {
      this.service.getCameras()
      .subscribe(data => this.cameras = data);
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent)
  {
      this.cameraId = this.cameras[tabChangeEvent.index].Id;
  }

  public showFiles(id)
  {
      this.router.navigate(['/camera-files', id]);
  }
}
