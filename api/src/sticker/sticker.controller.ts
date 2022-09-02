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

@Controller('sticker')
export class StickerController {
  constructor(private readonly stickerService: StickerService) {}

  @Post()
  create(@Body() createStickerDto: any) {
    return this.stickerService.create(createStickerDto);
  }

  @Get()
  findAll() {
    return this.stickerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stickerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStickerDto: any) {
    return this.stickerService.update(+id, updateStickerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stickerService.remove(+id);
  }
}
