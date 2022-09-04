type StickerInput = {
  id: number;
  quantity: number;
};

export class UpdateAlbumDto {
  stickerIds: Array<StickerInput>;
}
