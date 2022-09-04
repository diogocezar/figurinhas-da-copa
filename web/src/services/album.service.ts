import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sticker, UpdateStickers } from 'src/app/album/album.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private baseURL = 'http://localhost:3333/album';

  constructor(private httpClient: HttpClient) {}

  mountAlbum(): Observable<Sticker[]> {
    return this.httpClient.get<Sticker[]>(`${this.baseURL}/mount`);
  }

  updateAlbum(update: UpdateStickers[]) {
    return this.httpClient.patch<UpdateStickers[]>(`${this.baseURL}/`, update);
  }
}
