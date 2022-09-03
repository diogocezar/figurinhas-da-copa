import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StickersOnUsers, Prisma } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async update(updateAlbumDto: UpdateAlbumDto, request) {
    try {
      const userId = await this.getUserId(request);
      const { includeStickerIds, excludeStickerIds } = updateAlbumDto;
      if (!includeStickerIds.length && !excludeStickerIds.length)
        throw new Error('Include or remove stickers arrays are required.');
      if (includeStickerIds.length) {
        // TODO: verify if sticker exists
        includeStickerIds.forEach(async (stickerId) => {
          await this.prisma.stickersOnUsers.create({
            data: {
              userId,
              stickerId,
            },
          });
        });
      }
      if (excludeStickerIds.length) {
        // TODO: verify if exists in stickersOnUsers
        excludeStickerIds.forEach(async (stickerId) => {
          await this.prisma.stickersOnUsers.deleteMany({
            where: {
              userId,
              stickerId,
            },
          });
        });
      }
      const album = await this.findAlbum(userId);
      return { album };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async findAll(request) {
    const userId = await this.getUserId(request);
    return this.findAlbum(userId);
  }

  async getMissingToComplete(request) {
    //TODO: implements here
  }

  private async getUserId(request) {
    const email = request.user;
    const user = await this.userService.findOne(email);
    if (!user) throw new Error('Could not find userId.');
    return user.id;
  }

  private async findAlbum(userId: number) {
    return this.prisma.stickersOnUsers.findMany({
      where: { userId: userId },
      include: {
        sticker: {
          include: {
            country: true,
          },
        },
      },
    });
  }
}
