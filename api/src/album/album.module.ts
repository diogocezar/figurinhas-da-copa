import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaService } from '../shared/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService, UserService],
})
export class AlbumModule {}
