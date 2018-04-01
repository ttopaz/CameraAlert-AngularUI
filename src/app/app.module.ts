import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { CameraFilesComponent } from './camera-files/camera-files.component';

import { CameraService } from './camera.service';

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
  { path: '',
    redirectTo: '/cameras',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    CameraFilesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CameraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
