import { Module } from '@nestjs/common';
import { StickerModule } from './sticker/sticker.module';
import { CountryModule } from './country/country.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [StickerModule, CountryModule, UserModule, ConfigModule.forRoot()],
})
export class AppModule {}
