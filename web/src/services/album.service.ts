import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sticker } from 'src/app/album/types/Sticker';
import UpdateSticker from 'src/app/album/types/UpdateSticker';
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
    return this.httpClient.get<Sticker[]>(`${this.baseURL}/album/mount`, {
      headers: this.headers,
    });
  }

  updateAlbum(update: UpdateSticker[]) {
    return this.httpClient.patch<UpdateSticker[]>(
      `${this.baseURL}/album`,
      update,
      {
        headers: this.headers,
      }
    );
  }
}
