import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreate } from 'src/app/signin/types/UserCreate';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  create(user: UserCreate): Observable<UserCreate> {
    return this.httpClient.post<UserCreate>(`${this.baseURL}/user`, user);
  }
}
