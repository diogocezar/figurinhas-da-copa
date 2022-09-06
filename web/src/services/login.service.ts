import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import LoginOutput from 'src/app/login/types/LoginOutputType';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  setLocalStorage(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  requestLogin(username: string, password: string): Observable<LoginOutput> {
    return this.httpClient.post<LoginOutput>(`${this.baseURL}/auth/login`, {
      username,
      password,
    });
  }
}
