import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, filter, scan, } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { Camera } from './camera/camera';
import { CameraFile } from './camera-files/camera-file';

@Injectable()
export class CameraService {

  constructor(private http: HttpClient) { }

  private getBaseUrl() : string 
  {
//     return "http://192.168.1.80:3500";
     return "http://192.168.1.81:3500";
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

  public getCameraFiles (id, dateFilter): Observable<CameraFile[]> {
    const headers = this.getHeaders();

    let cameraFilesUrl = this.getBaseUrl() + "/CameraFiles?Id=" + id + "&Filter=.mp4";

    if (dateFilter == null)
      cameraFilesUrl += "&Days=1";
    else
      cameraFilesUrl += "&Date=" + dateFilter;            

    return this.http.get<CameraFile[]>(cameraFilesUrl, {headers}).pipe(
      map(res => { 
        //res.length = res.length > 100 ? 100 : res.length;
        return res.map(item => { 
          item.Date = new Date(item.Date.toLocaleString());
          item.CreateTime = new Date(item.CreateTime.toLocaleString());
          return item;
        });
      })
    )
  }

  public getCameraFileImage (cameraFile: CameraFile): Observable<string> {
    const headers = this.getHeaders();
    if (cameraFile.imageUrl)
    {
        let cameraFileImageUrl = this.getBaseUrl() + cameraFile.imageUrl + "&Width=120";
        const options = {headers, responseType: 'blob' as 'json' };
        return this.http.get<any>(cameraFileImageUrl, options).pipe(
          map(res => { return URL.createObjectURL(res) }
        ))
    }
    else if (cameraFile.imageUrlProvider)
    {
        let cameraFileImageUrl = this.getBaseUrl() + cameraFile.imageUrlProvider;
        return this.http.get<string>(cameraFileImageUrl, {headers}).pipe(
          map(res => { return res }
        ))
    }
    else
    {
      return Observable.of("");
    }
  }

  public getCameraFileVideo (cameraFile: CameraFile): Observable<string> {
    const headers = this.getHeaders();
    if (cameraFile.videoUrl)
    {
        let cameraFileVideoUrl = this.getBaseUrl() + cameraFile.videoUrl;
        return Observable.of(cameraFileVideoUrl);
    }
    else if (cameraFile.videoUrlProvider)
    {
        let cameraFileVideoUrl = this.getBaseUrl() + cameraFile.videoUrlProvider;
        return this.http.get<any>(cameraFileVideoUrl, {headers}).pipe(
          map(res => { return res.Url }
        ))
    }
  }

  public startCameraLiveVideo (camera: Camera): Observable<string> {
    const headers = this.getHeaders();
    let cameraLiveVideoUrl = camera.LiveVideo; 
    return Observable.of(cameraLiveVideoUrl);
//this.getBaseUrl() + "/PlayLiveVideo?Id=" + camera.Id;
    //return this.http.get<any>(cameraLiveVideoUrl, {headers}).pipe(
      //map(res => { return true }
 //   ))
  }
}
