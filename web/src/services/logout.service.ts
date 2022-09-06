import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor() {}

  clearLocalStorage() {
    localStorage.removeItem('accessToken');
  }

  logout() {
    this.clearLocalStorage();
  }
}
