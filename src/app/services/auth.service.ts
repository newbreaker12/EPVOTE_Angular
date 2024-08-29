import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {LOCAL_STORAGE_SECURITY_ACCESS_TOKEN, LOCAL_STORAGE_USER_DATA} from './constant';
import {UserData} from '../models/user-data';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public getAccessToken(email, password): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      this.baseUrl + '/users/login',
        {email, password}
    );
  }

  public getStoredAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_SECURITY_ACCESS_TOKEN);
  }

  navigateToLoginPage() {
    localStorage.removeItem(LOCAL_STORAGE_SECURITY_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!this.getStoredAccessToken();
  }

  refreshAccessToken(token) {
    const body = new URLSearchParams();
    body.set('token', token);
    this.http.post(
      this.baseUrl + '/token',
      body.toString()
    ).subscribe(
        (response: { token: string }) => {
            localStorage.setItem(LOCAL_STORAGE_SECURITY_ACCESS_TOKEN, response.token);
        }
    );
  }

  public getUserData(): UserData {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USER_DATA),
    ) as UserData;
  }
  getJWT(token?: string): UserData {
    const storedAccessToken = token || this.getStoredAccessToken();
    return storedAccessToken
      ? (jwtDecode(storedAccessToken) as UserData)
      : undefined;
  }
  getExpirationDate(): Date {
    const exp = this.getJWT()?.exp;
    if (!exp) {
      return null;
    }
    return new Date(exp * 1000);
  }
}
