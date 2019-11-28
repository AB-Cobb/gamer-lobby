import { Injectable } from '@angular/core';
//import { Observable, of} from 'rxjs';
import {WebAuth} from 'auth0-js';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import createAuth0Client from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0Client$ = (from(
    createAuth0Client({
      domain: "snowy-term-2316.auth0.com",
      client_id: "KaGyM3uGjtynqVAmGosbQEmpJmM5cKV1",
      redirect_uri: '/'
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError(err => throwError(err))
  );
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  loggedIn: boolean = null;

  constructor(private router: Router) {
    this.localAuthSetup();
    this.handleAuthCallback();
  }

  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/admin/player-list') {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: '/admin/player-list',//`${window.location.origin}`,
        appState: { target: redirectPath }
      });
    });
  }

  private handleAuthCallback() {
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; 
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap(cbRes => {
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/admin/player-list';
        }),
        concatMap(() => {
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      authComplete$.subscribe(([user, loggedIn]) => {
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: "KaGyM3uGjtynqVAmGosbQEmpJmM5cKV1",
        returnTo: `/`
      });
    });
  }

/*
  token_expires: number;
  user: any;
  token: string;
  loggedIn: boolean = false;
*/

  /*
  auth0 = new WebAuth({
      clientID: 'KaGyM3uGjtynqVAmGosbQEmpJmM5cKV1',
      domain: 'snowy-term-2316.auth0.com/login',
      responseType: 'token',
      redirectUri: 'https://shielded-caverns-18893.herokuapp.com',
      audience: 'https://snowy-term-2316.auth0.com/api/v2/',
      scope: 'openid profile email'
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
      returnTo: 'https://shielded-caverns-18893.herokuapp.com',
      clientID: 'Vp7Ru7169NLkvhq5PmD5KhVIO9oS7EbD'
    });
  }

  isLoggedIn(): boolean {
    return false;
    //return this.loggedIn && Date.now() < this.token_expires;
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
  }//*/
}
