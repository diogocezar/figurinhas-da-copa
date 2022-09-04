import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
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
      const { stickerIds } = updateAlbumDto;
      const hasStickers = stickerIds && stickerIds.length;
      if (!hasStickers) throw new Error('Sticker ids are required.');
      for (const sticker of stickerIds) {
        const { id: stickerId, quantity } = sticker;
        const stickerExists = await this.existsSticker(stickerId, userId);
        if (!stickerExists) {
          await this.prisma.stickersOnUsers.create({
            data: {
              userId,
              stickerId,
              quantity,
            },
          });
        } else {
          await this.prisma.stickersOnUsers.update({
            data: {
              quantity: sticker.quantity,
            },
            where: {
              stickerId_userId: {
                stickerId,
                userId,
              },
            },
          });
        }
      }
      const album = await this.findAlbum(userId);
      return { album };
    } catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  async findAll(request) {
    const userId = await this.getUserId(request);
    return this.findAlbum(userId);
  }

  async getMissingToComplete(request) {
    const userId = await this.getUserId(request);
    const album = await this.findAlbum(userId);
    const missing = await this.prisma.sticker.findMany({
      select: {
        number: true,
        name: true,
      },
      where: {
        NOT: {
          id: {
            in: album.map((sticker) => sticker.stickerId),
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return missing;
  }

  private async existsSticker(stickerId: number, userId: number) {
    return this.prisma.stickersOnUsers.findFirst({
      where: {
        userId,
        stickerId,
      },
    });
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
