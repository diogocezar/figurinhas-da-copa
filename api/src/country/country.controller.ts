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
import { CountryService } from './country.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCountry: Prisma.CountryCreateInput) {
    return this.countryService.create(createCountry);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne({ id: +id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCountry: Prisma.CountryUpdateInput,
  ) {
    return this.countryService.update({
      where: { id: +id },
      data: updateCountry,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove({ id: +id });
  }
}
