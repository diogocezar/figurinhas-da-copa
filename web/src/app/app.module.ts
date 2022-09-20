import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AlbumComponent } from './pages/album/album.component';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StatisComponent } from './components/statis/statis.component';
import { StickersComponent } from './components/stickers/stickers.component';
import { StickerComponent } from './components/sticker/sticker.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    LoginComponent,
    AlbumComponent,
    AppComponent,
    SigninComponent,
    LogoutComponent,
    StatisComponent,
    StickersComponent,
    StickerComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    FormBuilder,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
