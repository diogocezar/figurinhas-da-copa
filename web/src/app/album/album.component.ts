import { Component, OnInit } from '@angular/core';
import CountryId from './enum/CountryId';
import { AlbumService } from 'src/services/album.service';
import { Sticker } from 'src/app/album/types/Sticker';
import Country from 'src/app/album/types/Country';
import PlotSticker from 'src/app/album/types/PlotSticker';
import UpdateSticker from 'src/app/album/types/UpdateSticker';

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
  updateStickers: UpdateSticker[] = [];

  constructor(private albumService: AlbumService) {}

  filterByFwc() {
    return this.stickers.filter(
      (sticker) => sticker.country.id === CountryId.FWC
    );
  }

  filterByCoc() {
    return this.stickers.filter(
      (sticker) => sticker.country.id === CountryId.COC
    );
  }

  fillCountries() {
    this.stickers.forEach((sticker) => {
      if (
        !this.countries.find((country) => country.id === sticker.country.id) &&
        sticker.country.id !== CountryId.FWC &&
        sticker.country.id !== CountryId.COC
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
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
