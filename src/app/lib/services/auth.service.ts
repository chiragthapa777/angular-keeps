import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  constructor() {}

  canPass(): boolean {
    console.log("pass check")
    const token: unknown = localStorage.getItem('token');
    if (token) return true;
    return false;
  }
}
