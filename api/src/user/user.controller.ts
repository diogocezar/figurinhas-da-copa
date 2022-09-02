import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUser: Prisma.UserCreateInput) {
    return this.userService.create(createUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: Prisma.UserUpdateInput) {
    return this.userService.update({
      where: { id: +id },
      data: updateUser,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: +id });
  }
}
