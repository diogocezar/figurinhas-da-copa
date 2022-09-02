import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StickerService } from './sticker.service';
import { Prisma } from '@prisma/client';

@Controller('sticker')
export class StickerController {
  constructor(private readonly stickerService: StickerService) {}

  @Post()
  create(@Body() createSticker: Prisma.StickerCreateInput) {
    return this.stickerService.create(createSticker);
  }

  @Get()
  findAll() {
    return this.stickerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stickerService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSticker: Prisma.StickerUpdateInput,
  ) {
    return this.stickerService.update({
      where: { id: +id },
      data: updateSticker,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stickerService.remove({ id: +id });
  }
}
