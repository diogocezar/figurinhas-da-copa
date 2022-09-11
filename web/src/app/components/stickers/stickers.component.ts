import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import PlotSticker from 'src/app/pages/album/types/PlotSticker';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss'],
})
export class StickersComponent implements OnInit {
  @Input() title: string;
  @Input() type: string;
  @Input() plotStickers: PlotSticker[];
  @Output() handleChangeStickersComponent = new EventEmitter();

  constructor() {}

  handleChange(id, quantity, type, operation) {
    this.handleChangeStickersComponent.emit({ id, quantity, type, operation });
  }

  reciverHandleChange(event) {
    this.handleChange(event.id, event.quantity, event.type, event.operation);
  }

  ngOnInit(): void {}
}
