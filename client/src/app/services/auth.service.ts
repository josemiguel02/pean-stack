import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { ICredentials } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL_API: string = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(credentials: ICredentials) {
    return this.http.post<any>(`${this.URL_API}/register`, credentials);
  }

  login(credentials: ICredentials) {
    return this.http.post<any>(`${this.URL_API}/login`, credentials);
  }

  logout() {
    // this.router.navigate(['']);
    location.reload();
    Cookies.remove('jwt_token');
    localStorage.removeItem('data_user');
  }

  validateToken() {
    return this.http
      .get(`${this.URL_API}/validate-token`, {
        withCredentials: true,
      })
      .toPromise();
  }

  async canActivate() {
    if (!Cookies.get('jwt_token')) {
      this.router.navigate(['']);
      return false;
    }

    try {
      await this.validateToken();
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  async canDisable() {
    if (!Cookies.get('jwt_token')) {
      return true;
    }

    try {
      await this.validateToken();
      this.router.navigate(['/dashboard']);
      return false;
    } catch (error) {
      return true;
    }
  }
}
