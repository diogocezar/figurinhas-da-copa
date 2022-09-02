import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { Country, Prisma } from '@prisma/client';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountry: Prisma.CountryCreateInput) {
    return this.countryService.create(createCountry);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne({ id: +id });
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove({ id: +id });
  }
}
