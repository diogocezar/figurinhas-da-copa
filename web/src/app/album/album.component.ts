import { Component, OnInit } from '@angular/core';
import CountryId from './enum/CountryId';
import CountryType from 'src/app/album/enum/CountryType';
import { AlbumService } from 'src/services/album.service';
import { Sticker } from 'src/app/album/types/Sticker';
import Country from 'src/app/album/types/Country';
import PlotSticker from 'src/app/album/types/PlotSticker';
import UpdateSticker from 'src/app/album/types/UpdateSticker';
import { updatePlotStickers } from 'src/app/album/helpers/updatePlotStickers';
import { filterByType } from 'src/app/album/helpers/filter';
import { fill } from 'src/app/album/helpers/fill';
import { Router } from '@angular/router';

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

  constructor(private albumService: AlbumService, private router: Router) {
    this.updateStickers = {
      stickerIds: [],
    };
  }

  ngOnInit(): void {
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

    this.plotStickersCoc.push(plotStickerCoc);
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
        this.router.navigate(['/album']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
