import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StickerService } from './sticker.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt';

@Controller('sticker')
export class StickerController {
  constructor(private readonly stickerService: StickerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSticker: Prisma.StickerCreateInput) {
    return this.stickerService.create(createSticker);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.stickerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stickerService.findOne({ id: +id });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stickerService.remove({ id: +id });
  }
}
