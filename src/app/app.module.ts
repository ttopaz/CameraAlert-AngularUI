import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { CameraFilesComponent } from './camera-files/camera-files.component';

import { CameraService } from './camera.service';
import { CameraVideoComponent } from './camera-video/camera-video.component';
import { CameraLiveVideoComponent } from './camera-live-video/camera-live-video.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {
    path: 'cameras',
    component: CameraComponent,
    data: { title: 'Camera List' }
  },
  {
    path: 'camera-files/:id',
    component: CameraFilesComponent,
    data: { title: 'Camera Files' }
  },
  { 
    path: '',
    redirectTo: '/cameras',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    CameraFilesComponent,
    CameraVideoComponent,
    CameraLiveVideoComponent,
    AboutComponent
  ],
  entryComponents: [
    CameraVideoComponent,
    CameraLiveVideoComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CameraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
