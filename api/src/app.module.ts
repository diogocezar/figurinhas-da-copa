import { Module } from '@nestjs/common';
import { StickerModule } from './sticker/sticker.module';
import { CountryModule } from './country/country.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    StickerModule,
    CountryModule,
    UserModule,
    ConfigModule.forRoot(),
    AuthModule,
    AlbumModule,
  ],
})
export class AppModule {}
