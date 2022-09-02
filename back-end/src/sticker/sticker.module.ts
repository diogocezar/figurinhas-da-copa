import { Module } from '@nestjs/common';
import { StickerService } from './sticker.service';
import { StickerController } from './sticker.controller';

@Module({
  controllers: [StickerController],
  providers: [StickerService],
})
export class StickerModule {}
