import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, filter, scan } from 'rxjs/operators';

import { Camera } from './camera/camera';
import { CameraFile } from './camera-files/camera-file';

@Injectable()
export class CameraService {

  constructor(private http: HttpClient) { }

  private getBaseUrl() : string 
  {
     return "http://localhost:3500";
//     return "http://24.98.212.41:3500";
  }

  private getHeaders() : HttpHeaders 
  {
    let username: string = 'admin';
    let password: string = 'admin';
    const headers = new HttpHeaders()
            .set("Authorization", "Basic " + btoa(username + ":" + password));
    return headers;        
  }

  public getCameras (): Observable<Camera[]> {
    let camerasUrl = this.getBaseUrl() + "/Cameras";
    const headers = this.getHeaders();
    return this.http.get<Camera[]>(camerasUrl, {headers});
  }

  public getCameraFiles (id): Observable<CameraFile[]> {
    const headers = this.getHeaders();
    let cameraFilesUrl = this.getBaseUrl() + "/CameraFiles?Id=" + id + "&Filter=.mp4";

    return this.http.get<CameraFile[]>(cameraFilesUrl, {headers}).pipe(
      map(res => { 
        return res.map(item => { 
          item.Date = new Date(item.Date.toLocaleString());
          return item;
        });
      })
    )
  }

  public getCameraFileImage (id, file): Observable<string> {
    const headers = this.getHeaders();
    let cameraFileImageUrl = this.getBaseUrl() + "/GetCameraImage?Id=" + id + "&File=" + 
    file.replace(".mp4", ".jpg") + "&Width=120";

    const options = {headers, responseType: 'blob' as 'json' };
    return this.http.get<any>(cameraFileImageUrl, options).pipe(
      map(res => { return URL.createObjectURL(res) }
    ))
  }
}
