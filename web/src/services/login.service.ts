import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../app/login/login.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = 'http://localhost:3333/auth/login';

  constructor(private httpClient: HttpClient) {}

  private setLocalStorage(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  login(username: string, password: string) {
    this.httpClient
      .post<Login>(this.baseURL, { username, password })
      .subscribe((data) => {
        this.setLocalStorage(data.access_token);
      });
  }
}
