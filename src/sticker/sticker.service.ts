import { Injectable } from '@nestjs/common';

@Injectable()
export class StickerService {
  create(createStickerDto: any) {
    return 'This action adds a new sticker';
  }

  findAll() {
    return `This action returns all sticker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sticker`;
  }

  update(id: number, updateStickerDto: any) {
    return `This action updates a #${id} sticker`;
  }

  remove(id: number) {
    return `This action removes a #${id} sticker`;
  }
}
