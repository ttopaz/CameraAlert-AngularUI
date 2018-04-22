import {
  Component,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  DomSanitizer,
  SafeUrl
} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-camera-live-video',
  templateUrl: './camera-live-video.component.html',
  styleUrls: ['./camera-live-video.component.scss']
})

export class CameraLiveVideoComponent {
  videoUrl: any;
  mediaElement: any;
  constructor(public dialogRef: MatDialogRef < CameraLiveVideoComponent > , private Sanitization: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.videoUrl = this.Sanitization.bypassSecurityTrustUrl(data.url);
  }

  ngAfterViewInit() {
    $('#liveVideo').mediaelementplayer({
      pluginPath: '/assets/mediaelement/',
      success: function(mediaElement, originalNode, instance) {
        $('.mejs__overlay-button').css('display', 'none');
        this.mediaElement = instance;
        instance.load();
        mediaElement.addEventListener('loadstart', function() {
          setTimeout(() => instance.play(), 500);
        }, false);
        mediaElement.addEventListener('canplay', function() {
          instance.play();
        }, false);
        mediaElement.addEventListener('loadedmetadata', function() {
          instance.play();
        }, false);
      }
    });
  }

  ngOnDestroy() {
    if (this.mediaElement) {
      try {
        this.mediaElement.pause();
        this.mediaElement.remove(true);
      } catch (err) {
        console.log(err);
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}