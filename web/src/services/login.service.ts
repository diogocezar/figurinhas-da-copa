import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import LoginOutput from 'src/app/pages/login/types/LoginOutputType';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = 'http://localhost:3333';

  constructor(private httpClient: HttpClient) {}

  setLocalStorage(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  login(username: string, password: string): Observable<LoginOutput> {
    return this.httpClient.post<LoginOutput>(`${this.baseURL}/auth/login`, {
      username,
      password,
    });
  }
}
