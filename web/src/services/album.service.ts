import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sticker, UpdateStickers } from 'src/app/album/album.interfaces';
import { LoginService } from 'src/services/login.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private baseURL = environment.apiBaseUrl;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private login: LoginService) {
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${login.getAccessToken()}`);
  }

  mountAlbum(): Observable<Sticker[]> {
    console.log(this.headers);
    return this.httpClient.get<Sticker[]>(`${this.baseURL}/album/mount`, {
      headers: this.headers,
    });
  }

  updateAlbum(update: UpdateStickers[]) {
    return this.httpClient.patch<UpdateStickers[]>(
      `${this.baseURL}/album`,
      update,
      {
        headers: this.headers,
      }
    );
  }
}
