import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import PlotSticker from 'src/app/pages/album/types/PlotSticker';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss'],
})
export class StickersComponent implements OnInit {
  @Input() title: string;
  @Input() plotStickers: PlotSticker[];
  @Output() handleChangeSticketsComponent = new EventEmitter();

  constructor() {}

  handleChange(id, quantity, type, operation) {
    this.handleChangeSticketsComponent.emit({ id, quantity, type, operation });
  }

  ngOnInit(): void {}
}
