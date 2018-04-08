import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as jsmpeg from 'jsmpeg';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-camera-live-video',
  templateUrl: './camera-live-video.component.html',
  styleUrls: ['./camera-live-video.component.scss']
})

export class CameraLiveVideoComponent {
  videoUrl : string;
  client : WebSocket;
  @ViewChild('myCanvas') private myCanvas: ElementRef; 
  constructor(public dialogRef: MatDialogRef<CameraLiveVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    { 
       this.videoUrl = 'ws://192.168.1.80:9999';
    }

    ngAfterViewInit() : void{
      this.client = new WebSocket('ws://192.168.1.80:9999');
      var canvas = this.myCanvas.nativeElement;
      var ctx = canvas.getContext("2d");
     ctx.fillStyle = "blue";
     ctx.crossOrigin = "anonymous";
     ctx.fillRect(0, 0, canvas.width, canvas.height);
      var player = new jsmpeg(this.client, {canvas : canvas});
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
