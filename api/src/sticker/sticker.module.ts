import { Module } from '@nestjs/common';
import { StickerService } from './sticker.service';
import { StickerController } from './sticker.controller';
import { PrismaService } from '../shared/prisma.service';

@Module({
  controllers: [StickerController],
  providers: [StickerService, PrismaService],
})
export class StickerModule {}
