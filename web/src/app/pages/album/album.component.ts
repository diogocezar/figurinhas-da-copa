import { Component, OnInit } from '@angular/core';
import CountryId from './enum/CountryId';
import CountryType from 'src/app/pages/album/enum/CountryType';
import { AlbumService } from 'src/services/album.service';
import { Sticker } from 'src/app/pages/album/types/Sticker';
import Country from 'src/app/pages/album/types/Country';
import PlotSticker from 'src/app/pages/album/types/PlotSticker';
import UpdateSticker from 'src/app/pages/album/types/UpdateSticker';
import { updatePlotStickers } from 'src/app/pages/album/helpers/updatePlotStickers';
import {
  filterByType,
  filterByRepeated,
  filterByMissing,
  filterByUnique,
} from 'src/app/pages/album/helpers/filter';
import { generateTextToCopy } from 'src/app/pages/album/helpers/generateTextToCopy';
import { fill } from 'src/app/pages/album/helpers/fill';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  getCompleted,
  getCompletedPercentage,
  getRepeated,
  getTotal,
} from 'src/app/pages/album/helpers/counters';
import { ToastrService } from 'ngx-toastr';
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

  albumPercentage: number;
  totalStickers: number;
  completedStickers: number;
  repeatedStickers: number;

  isMenuOpen: true;

  constructor(
    private albumService: AlbumService,
    private clipboard: Clipboard,
    private toastrService: ToastrService,
    private router: Router
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
    const stickersFwcFiltred = this.stickersFwc.filter(
      (stickerIn) => CountryId.FWC === stickerIn.country.id
    );
    const stickersCocFiltred = this.stickersCoc.filter(
      (stickerIn) => CountryId.COC === stickerIn.country.id
    );
    const plotStickerFwc: PlotSticker = {
      country: { id: CountryId.FWC, name: 'FIFA World Cup' },
      percentage: getCompletedPercentage(stickersFwcFiltred),
      stickers: stickersFwcFiltred,
    };

    const plotStickerCoc: PlotSticker = {
      country: { id: CountryId.COC, name: 'Coca Cola' },
      percentage: getCompletedPercentage(stickersCocFiltred),
      stickers: stickersCocFiltred,
    };

    tempPlotStickersFwc.push(plotStickerFwc);
    tempPlotStickersCoc.push(plotStickerCoc);

    this.countries.forEach((country) => {
      const stickersFiltred = this.stickerCountries.filter(
        (stickerIn) => country.id === stickerIn.country.id
      );
      const plotSticker: PlotSticker = {
        country: country,
        percentage: getCompletedPercentage(stickersFiltred),
        stickers: stickersFiltred,
      };
      tempPlotStickersCountries.push(plotSticker);
    });
    this.plotStickersFwc = tempPlotStickersFwc;
    this.plotStickersCoc = tempPlotStickersCoc;
    this.plotStickersCountries = tempPlotStickersCountries;

    this.fillStats();
  }

  fillStats() {
    this.albumPercentage = getCompletedPercentage(this.stickers);
    this.completedStickers = getCompleted(this.stickers);
    this.repeatedStickers = getRepeated(this.stickers);
    this.totalStickers = getTotal(this.stickers);
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

  reciverHandleChange(event) {
    this.handleChange(event.id, event.quantity, event.type, event.operation);
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
    this.save();
  }

  save() {
    this.albumService.updateAlbum(this.updateStickers).subscribe({
      next: (response) => {
        this.getFromServer();
      },
      error: (error) => {
        this.toastrService.error('Houve um erro ao salvar as alterações!');
        console.log(error);
      },
    });
  }

  copy() {
    let textToCopy = '';
    textToCopy += generateTextToCopy(this.plotStickersFwc);
    textToCopy += generateTextToCopy(this.plotStickersCountries);
    textToCopy += generateTextToCopy(this.plotStickersCoc);
    this.clipboard.copy(textToCopy);
    this.toastrService.success(
      'As figurinhas foram copiadas para a área de transferência.'
    );
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  filterRepeated() {
    this.fillPlotStickers();
    this.plotStickersFwc = filterByRepeated(this.plotStickersFwc);
    this.plotStickersCountries = filterByRepeated(this.plotStickersCountries);
    this.plotStickersCoc = filterByRepeated(this.plotStickersCoc);
    this.toastrService.info('Mostrando apenas as figurinhas repetidas.');
  }

  filterMissing() {
    this.fillPlotStickers();
    this.plotStickersFwc = filterByMissing(this.plotStickersFwc);
    this.plotStickersCountries = filterByMissing(this.plotStickersCountries);
    this.plotStickersCoc = filterByMissing(this.plotStickersCoc);
    this.toastrService.info('Mostrando apenas as figurinhas faltantes.');
  }

  filterUnique() {
    this.fillPlotStickers();
    this.plotStickersFwc = filterByUnique(this.plotStickersFwc);
    this.plotStickersCountries = filterByUnique(this.plotStickersCountries);
    this.plotStickersCoc = filterByUnique(this.plotStickersCoc);
    this.toastrService.info('Mostrando apenas as figurinhas únicas.');
  }

  reciverHandleChangeMenu(option) {
    switch (option) {
      case 'repeated':
        this.filterRepeated();
        break;
      case 'missing':
        this.filterMissing();
        break;
      case 'unique':
        this.filterUnique();
        break;
      case 'remove':
        this.fillPlotStickers();
        break;
      case 'copy':
        this.copy();
        break;
      case 'logout':
        this.logout();
        break;
    }
  }
}
