import { Component, OnInit } from '@angular/core';
import {
  PlotSticker,
  Sticker,
  UpdateStickers,
  Country,
} from 'src/app/album/album.interfaces';
import { AlbumService } from 'src/services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  stickers: Sticker[] = [];
  stickersFwc: Sticker[] = [];
  stickersCoc: Sticker[] = [];
  countries: Country[] = [];
  stickerCountries: Sticker[] = [];
  plotStickers: PlotSticker[] = [];
  updateStickers: UpdateStickers[] = [];

  constructor(private albumService: AlbumService) {}

  filterByFwc() {
    return this.stickers.filter((sticker) => sticker.country.id === 1);
  }

  filterByCoc() {
    return this.stickers.filter((sticker) => sticker.country.id === 34);
  }

  fillCountries() {
    this.stickers.forEach((sticker) => {
      if (
        !this.countries.find((country) => country.id === sticker.country.id) &&
        sticker.country.id !== 1 &&
        sticker.country.id !== 34
      ) {
        this.countries.push(sticker.country);
      }
    });
  }

  filterByCountries() {
    return this.stickers.filter(
      (sticker) => sticker.country.id !== 1 && sticker.country.id !== 34
    );
  }

  fillPlotStickers() {
    this.countries.forEach((country) => {
      const plotSticker: PlotSticker = {
        country: country,
        stickers: this.stickerCountries.filter(
          (stickerIn) => country.id === stickerIn.country.id
        ),
      };
      this.plotStickers.push(plotSticker);
    });
  }

  ngOnInit(): void {
    this.albumService.mountAlbum().subscribe({
      next: (response) => {
        this.stickers = response;
        this.stickersFwc = this.filterByFwc();
        this.stickersCoc = this.filterByCoc();
        this.stickerCountries = this.filterByCountries();
        this.fillCountries();
        this.fillPlotStickers();
        console.log(this.plotStickers);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
