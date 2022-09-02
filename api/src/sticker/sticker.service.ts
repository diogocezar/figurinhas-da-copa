import { Injectable } from '@nestjs/common';
import { Sticker, Prisma } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class StickerService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StickerCreateInput): Promise<Sticker> {
    return this.prisma.sticker.create({
      data,
    });
  }

  async findAll(): Promise<Sticker[]> {
    return this.prisma.sticker.findMany();
  }

  async findOne(where: Prisma.StickerWhereUniqueInput) {
    return this.prisma.sticker.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.StickerWhereUniqueInput;
    data: Prisma.StickerUpdateInput;
  }): Promise<Sticker> {
    const { where, data } = params;
    return this.prisma.sticker.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.StickerWhereUniqueInput): Promise<Sticker> {
    return this.prisma.sticker.delete({
      where,
    });
  }
}
