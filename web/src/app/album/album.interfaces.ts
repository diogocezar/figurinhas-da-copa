interface BaseSticker {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface Sticker extends BaseSticker {
  number: number;
  country: Country;
  quantity: number;
}

interface PlotSticker {
  country: Country;
  stickers: Sticker[];
}

interface UpdateStickers {
  stickerIds: BaseSticker[];
}

export { Sticker, UpdateStickers, PlotSticker, Country };
