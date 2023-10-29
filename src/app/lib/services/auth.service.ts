import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../constants';
import { RegisterModelResponse } from '../model/RegisterResponse';
import { AuthenticatedUser } from '../model/AuthenticatedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  private _authUserSubject = new BehaviorSubject<AuthenticatedUser | null>(
    null
  );

  constructor(private http: HttpClient) {}

  get authUser() {
    return this._authUserSubject.value;
  }

  get authUserSubject() {
    return this._authUserSubject.asObservable();
  }

  canPass(): boolean {
    console.log('pass check');
    const token: unknown = localStorage.getItem('token');
    if (token) return true;
    return false;
  }

  setAuthUser(data: RegisterModelResponse) {
    this._authUserSubject.next(data as AuthenticatedUser);
    localStorage.setItem('token', data.token);
  }

  register(body: any): Observable<any> {
    const obs = this.http.post<RegisterModelResponse>(
      baseUrl + '/user/register',
      body
    );
    return obs;
  }

  login(body: any): Observable<any> {
    return this.http.post(baseUrl + '/user/login', body);
  }
}
