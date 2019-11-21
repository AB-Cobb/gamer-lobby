import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {WebAuth} from 'auth0-js';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token_expires: number;
  user: any;
  token: string;
  loggedIn: boolean;

  auth0 = new WebAuth({
      clientID: 'Vp7Ru7169NLkvhq5PmD5KhVIO9oS7EbD',
      domain: 'dev-5fqhxxpv.auth0.com',
      responseType: 'token',
      redirectUri: 'http://localhost:4200/callback',
      audience: 'http://localhost:3001',
      scope: 'openid profile'
  })
  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }
  getUserInfo(authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }
  private _setSession(authResult, profile) {
    this.token_expires = authResult.expiresIn * 1000 + Date.now();
    this.token = authResult.accessToken;
    this.user = profile;
    this.loggedIn = true;
  }

  logout(): void {
    this.auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: 'Vp7Ru7169NLkvhq5PmD5KhVIO9oS7EbD'
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn && Date.now() < this.token_expires;
  }

  login(){
    this.auth0.authorize();
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  constructor(private router: Router) { 
    this.getAccessToken();
  }
}
