import { Component, OnInit } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from '../camera.service';
import { Camera } from './camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  cameras: Camera[];
  
  constructor(private http: HttpClient, private router: Router
    , private route: ActivatedRoute, private service: CameraService) { }

  ngOnInit() {
      this.service.getCameras()
      .subscribe(data => this.cameras = data);
  }

  public showFiles(id)
  {
      this.router.navigate(['/camera-files', id]);
  }
}
