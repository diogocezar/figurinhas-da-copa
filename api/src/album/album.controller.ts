import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from '../auth/guards/jwt';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateAlbumDto: UpdateAlbumDto, @Request() request) {
    return this.albumService.update(updateAlbumDto, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() request) {
    return this.albumService.findAll(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/missing')
  getMissingToComplete(@Request() request) {
    return this.albumService.getMissingToComplete(request);
  }
}
