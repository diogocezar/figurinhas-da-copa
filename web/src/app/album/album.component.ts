import { Component, OnInit } from '@angular/core';
import CountryId from './enum/CountryId';
import CountryType from 'src/app/album/enum/CountryType';
import { AlbumService } from 'src/services/album.service';
import { Sticker } from 'src/app/album/types/Sticker';
import Country from 'src/app/album/types/Country';
import PlotSticker from 'src/app/album/types/PlotSticker';
import UpdateSticker from 'src/app/album/types/UpdateSticker';
import { updatePlotStickers } from 'src/app/album/helpers/updatePlotStickers';
import {
  filterByType,
  filterByRepeated,
  filterByMissing,
  filterByUnique,
} from 'src/app/album/helpers/filter';
import { generateTextToCopy } from 'src/app/album/helpers/generateTextToCopy';
import { fill } from 'src/app/album/helpers/fill';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

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
  countriesFwc: Country[] = [];
  countriesCoc: Country[] = [];

  plotStickersFwc: PlotSticker[] = [];
  plotStickersCountries: PlotSticker[] = [];
  plotStickersCoc: PlotSticker[] = [];

  updateStickers: UpdateSticker;

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private clipboard: Clipboard
  ) {
    this.updateStickers = {
      stickerIds: [],
    };
  }

  ngOnInit(): void {
    this.getFromServer();
  }

  getFromServer() {
    this.albumService.mountAlbum().subscribe({
      next: (response) => {
        this.stickers = response;

        this.stickersFwc = filterByType(this.stickers, CountryType.FWC);
        this.stickerCountries = filterByType(
          this.stickers,
          CountryType.COUNTRIES
        );
        this.stickersCoc = filterByType(this.stickers, CountryType.COC);

        this.countriesFwc = fill(
          this.stickers,
          this.countries,
          CountryType.FWC
        );
        this.countries = fill(
          this.stickers,
          this.countries,
          CountryType.COUNTRIES
        );
        this.countriesCoc = fill(
          this.stickers,
          this.countries,
          CountryType.COC
        );

        this.fillPlotStickers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fillPlotStickers() {
    const tempPlotStickersFwc: PlotSticker[] = [];
    const tempPlotStickersCoc: PlotSticker[] = [];
    const tempPlotStickersCountries: PlotSticker[] = [];
    const plotStickerFwc: PlotSticker = {
      country: { id: CountryId.FWC, name: 'FIFA World Cup' },
      stickers: this.stickersFwc.filter(
        (stickerIn) => CountryId.FWC === stickerIn.country.id
      ),
    };

    const plotStickerCoc: PlotSticker = {
      country: { id: CountryId.COC, name: 'Coca Cola' },
      stickers: this.stickersCoc.filter(
        (stickerIn) => CountryId.COC === stickerIn.country.id
      ),
    };

    tempPlotStickersFwc.push(plotStickerFwc);
    tempPlotStickersCoc.push(plotStickerCoc);

    this.countries.forEach((country) => {
      const plotSticker: PlotSticker = {
        country: country,
        stickers: this.stickerCountries.filter(
          (stickerIn) => country.id === stickerIn.country.id
        ),
      };
      tempPlotStickersCountries.push(plotSticker);
    });
    this.plotStickersFwc = tempPlotStickersFwc;
    this.plotStickersCoc = tempPlotStickersCoc;
    this.plotStickersCountries = tempPlotStickersCountries;
  }

  handleUpdateList(id, quantity) {
    const exists = this.updateStickers.stickerIds.find(
      (sticker) => sticker.id === id
    );
    if (!exists) {
      const newSticker: Sticker = {
        id,
        quantity,
      };
      this.updateStickers.stickerIds.push(newSticker);
    } else {
      this.updateStickers.stickerIds = this.updateStickers.stickerIds.map(
        (sticker) => {
          if (sticker.id === id) {
            return {
              ...sticker,
              quantity,
            };
          }
          return sticker;
        }
      );
    }
  }

  handleChange(id, quantity, type, operation) {
    let newQuantity;
    if (operation === 'add') newQuantity = quantity + 1;
    if (operation === 'sub') newQuantity = quantity - 1;
    if (newQuantity < 0) newQuantity = 0;
    if (newQuantity > 5) newQuantity = 5;
    if (type === 'fwc') {
      this.plotStickersFwc = updatePlotStickers(
        this.plotStickersFwc,
        id,
        newQuantity,
        'add',
        'fwc'
      );
    }
    if (type === 'countries') {
      this.plotStickersCountries = updatePlotStickers(
        this.plotStickersCountries,
        id,
        newQuantity,
        'add',
        'countries'
      );
    }
    if (type === 'coc') {
      this.plotStickersCoc = updatePlotStickers(
        this.plotStickersCoc,
        id,
        newQuantity,
        'add',
        'coc'
      );
    }
    this.handleUpdateList(id, newQuantity);
  }

  save() {
    this.albumService.updateAlbum(this.updateStickers).subscribe({
      next: (response) => {
        this.getFromServer();
        this.fillPlotStickers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  copy() {
    let textToCopy = '';
    textToCopy += generateTextToCopy(this.plotStickersFwc);
    textToCopy += generateTextToCopy(this.plotStickersCountries);
    textToCopy += generateTextToCopy(this.plotStickersCoc);
    console.log(textToCopy);
    this.clipboard.copy(textToCopy);
  }

  filterRepeated() {
    this.fillPlotStickers();
    this.plotStickersFwc = filterByRepeated(this.plotStickersFwc);
    this.plotStickersCountries = filterByRepeated(this.plotStickersCountries);
    this.plotStickersCoc = filterByRepeated(this.plotStickersCoc);
  }

  filterMissing() {
    this.fillPlotStickers();
    this.plotStickersFwc = filterByMissing(this.plotStickersFwc);
    this.plotStickersCountries = filterByMissing(this.plotStickersCountries);
    this.plotStickersCoc = filterByMissing(this.plotStickersCoc);
  }

  filterUnique() {
    this.fillPlotStickers();
    this.plotStickersFwc = filterByUnique(this.plotStickersFwc);
    this.plotStickersCountries = filterByUnique(this.plotStickersCountries);
    this.plotStickersCoc = filterByUnique(this.plotStickersCoc);
  }
}
