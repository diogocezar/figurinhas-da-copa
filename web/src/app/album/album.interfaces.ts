interface BaseSticker {
  id: number;
  name: string;
}

interface Sticker extends BaseSticker {
  number: number;
  quantity: number;
}

interface UpdateStickers {
  stickerIds: BaseSticker[];
}

export { Sticker, UpdateStickers };
