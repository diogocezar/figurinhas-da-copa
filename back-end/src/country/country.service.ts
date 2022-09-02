import { Injectable } from '@nestjs/common';
import { Country, Prisma } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CountryCreateInput): Promise<Country> {
    return this.prisma.country.create({
      data,
    });
  }

  async findAll(): Promise<Country[]> {
    return this.prisma.country.findMany();
  }

  async findOne(where: Prisma.CountryWhereUniqueInput) {
    return this.prisma.country.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }): Promise<Country> {
    const { where, data } = params;
    return this.prisma.country.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
    return this.prisma.country.delete({
      where,
    });
  }
}
