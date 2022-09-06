import { Component, OnInit } from '@angular/core';
import CountryId from './enum/CountryId';
import { AlbumService } from 'src/services/album.service';
import { Sticker } from 'src/app/album/types/Sticker';
import Country from 'src/app/album/types/Country';
import PlotSticker from 'src/app/album/types/PlotSticker';
import UpdateSticker from 'src/app/album/types/UpdateSticker';
import { updatePlotStickers } from 'src/app/album/helpers/updatePlotStickers';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  stickers: Sticker[] = [];
  stickersFwc: Sticker[] = [];
  stickersCoc: Sticker[] = [];
  stickerCountries: Sticker[] = [];

  countries: Country[] = [];
  fwc: Country[] = [];
  coc: Country[] = [];

  plotStickersFwc: PlotSticker[] = [];
  plotStickersCountries: PlotSticker[] = [];
  plotStickersCoc: PlotSticker[] = [];

  updateStickers: UpdateSticker;

  constructor(private albumService: AlbumService) {
    this.updateStickers = {
      stickerIds: [],
    };
  }

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

  fillFwc() {
    this.stickers.forEach((sticker) => {
      if (
        !this.countries.find((country) => country.id === sticker.country.id) &&
        sticker.country.id === CountryId.FWC
      ) {
        this.fwc.push(sticker.country);
      }
    });
  }

  fillCoc() {
    this.stickers.forEach((sticker) => {
      if (
        !this.countries.find((country) => country.id === sticker.country.id) &&
        sticker.country.id === CountryId.COC
      ) {
        this.coc.push(sticker.country);
      }
    });
  }

  filterByCountries() {
    return this.stickers.filter(
      (sticker) =>
        sticker.country.id !== CountryId.FWC &&
        sticker.country.id !== CountryId.COC
    );
  }

  fillPlotStickers() {
    const plotStickerFwc: PlotSticker = {
      country: { id: CountryId.FWC, name: 'FIFA World Cup' },
      stickers: this.stickersFwc.filter(
        (stickerIn) => CountryId.FWC === stickerIn.country.id
      ),
    };
    this.plotStickersFwc.push(plotStickerFwc);

    this.countries.forEach((country) => {
      const plotSticker: PlotSticker = {
        country: country,
        stickers: this.stickerCountries.filter(
          (stickerIn) => country.id === stickerIn.country.id
        ),
      };
      this.plotStickersCountries.push(plotSticker);
    });

    const plotStickerCoc: PlotSticker = {
      country: { id: CountryId.COC, name: 'Coca Cola' },
      stickers: this.stickersCoc.filter(
        (stickerIn) => CountryId.COC === stickerIn.country.id
      ),
    };
    this.plotStickersCoc.push(plotStickerCoc);
  }

  addToUpdateList(id, quantity) {
    const exists = this.updateStickers.stickerIds.find(
      (sticker) => sticker.id === id
    );
    if (!exists) {
      const newSticker: Sticker = {
        id,
        quantity: quantity + 1,
      };
      this.updateStickers.stickerIds.push(newSticker);
    } else {
      this.updateStickers.stickerIds = this.updateStickers.stickerIds.map(
        (sticker) => {
          if (sticker.id === id) {
            return {
              ...sticker,
              quantity: sticker.quantity + 1,
            };
          }
          return sticker;
        }
      );
    }
  }

  add(id, quantity) {
    this.plotStickersFwc = updatePlotStickers(
      this.plotStickersFwc,
      id,
      quantity,
      'add',
      'fwc'
    );
    this.plotStickersCountries = updatePlotStickers(
      this.plotStickersCountries,
      id,
      quantity,
      'add',
      'countries'
    );
    this.plotStickersCoc = updatePlotStickers(
      this.plotStickersCoc,
      id,
      quantity,
      'add',
      'coc'
    );
  }

  sub(id, quantity) {
    this.plotStickersFwc = updatePlotStickers(
      this.plotStickersFwc,
      id,
      quantity,
      'sub',
      'fwc'
    );
    this.plotStickersCountries = updatePlotStickers(
      this.plotStickersCountries,
      id,
      quantity,
      'sub',
      'countries'
    );
    this.plotStickersCoc = updatePlotStickers(
      this.plotStickersCoc,
      id,
      quantity,
      'sub',
      'coc'
    );
  }

  ngOnInit(): void {
    this.albumService.mountAlbum().subscribe({
      next: (response) => {
        this.stickers = response;

        this.stickersFwc = this.filterByFwc();
        this.stickersCoc = this.filterByCoc();
        this.stickerCountries = this.filterByCountries();

        this.fillFwc();
        this.fillCoc();
        this.fillCountries();

        console.log(this.plotStickersCoc);

        this.fillPlotStickers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
