import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.mountAlbum().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {},
    });
  }
}
