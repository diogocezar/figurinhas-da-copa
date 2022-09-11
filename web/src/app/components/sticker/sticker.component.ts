import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sticker } from 'src/app/pages/album/types/Sticker';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements OnInit {
  @Input() sticker: Sticker;
  @Input() type: string;
  @Output() handleChangeStickerComponent = new EventEmitter();

  constructor() {}

  handleChange(id, quantity, type, operation) {
    this.handleChangeStickerComponent.emit({ id, quantity, type, operation });
  }

  ngOnInit(): void {}
}
