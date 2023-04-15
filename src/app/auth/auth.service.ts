import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { Observable, Subject } from 'rxjs';
import { LoginResult } from './login-result';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey: string = 'jwt-token';
  private _authStatus = new Subject<boolean>();

  public authStatus = this._authStatus.asObservable();

  init(): void {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);
    }
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._authStatus.next(isAuthenticated);
  }

  constructor(protected http: HttpClient) { }

  isAuthenticated() : boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(item: LoginRequest): Observable<LoginResult> {
      var url = environment.baseUrl + 'api/Account';
      return this.http.post<LoginResult>(url, item);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
