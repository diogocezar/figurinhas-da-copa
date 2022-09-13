import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sticker } from 'src/app/pages/album/types/Sticker';
import UpdateSticker from 'src/app/pages/album/types/UpdateSticker';
import { LoginService } from 'src/services/login.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private baseURL = 'http://localhost:3333';

  constructor(private httpClient: HttpClient) {}

  mountAlbum(): Observable<Sticker[]> {
    return this.httpClient.get<Sticker[]>(`${this.baseURL}/album/mount`);
  }

  updateAlbum(update: UpdateSticker) {
    return this.httpClient.patch<UpdateSticker>(
      `${this.baseURL}/album`,
      update
    );
  }
}
