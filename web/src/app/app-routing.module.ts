import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from 'src/app/pages/album/album.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SigninComponent } from 'src/app/pages/signin/signin.component';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: SigninComponent },
  { path: 'album', component: AlbumComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
