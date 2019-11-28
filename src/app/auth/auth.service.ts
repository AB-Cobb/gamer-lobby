import { Injectable } from '@angular/core';
import {WebAuth} from 'auth0-js';
import { Router } from '@angular/router';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import createAuth0Client from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = null;
  userProfile: any;
  accessToken: string;
  expiresAt: number;

  auth0 = new WebAuth({
    clientID: "KaGyM3uGjtynqVAmGosbQEmpJmM5cKV1",
    domain: "snowy-term-2316.auth0.com",
    responseType: 'token',
    redirectUri: 'https://shielded-caverns-18893.herokuapp.com/callback',
    audience: "https://shielded-caverns-18893.herokuapp.com/api",
    
  })


  constructor(private router: Router) {
    this.getAccessToken();
  }

  login() {
    this.auth0.authorize();
  }

  handleLoginCallback() {
    console.log('handle longin call back');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(err.error);
      }
      this.router.navigate(['/admin/player-list']);
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      } else if (err) {
        console.log(err);
        this.logout();
        this.loggedIn = false;
      }
    });
  }
  getUserInfo(authResult) {
    console.log('get user info');
    console.log("logged in = "+this.isLoggedIn())
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  private _setSession(authResult, profile) {
    console.log('set session');
    const expTime = authResult.expiresIn * 1000 + Date.now();
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.loggedIn = true;
    console.log("logged in = "+this.isLoggedIn())
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
    //return (Date.now() < this.expiresAt) && this.loggedIn;
  }

  logout() {
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
    this.accessToken = undefined;
    this.loggedIn = false;
    console.log("logged in = "+this.isLoggedIn())
  }
  //*/
  /*
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  

  auth0Client$ = (from(
    createAuth0Client({
      domain: "snowy-term-2316.auth0.com",
      client_id: "KaGyM3uGjtynqVAmGosbQEmpJmM5cKV1",
      redirect_uri: 'https://shielded-caverns-18893.herokuapp.com',
      audience: "https://shielded-caverns-18893.herokuapp.com/api"
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
        redirect_uri: 'https://shielded-caverns-18893.herokuapp.com/admin/player-list',
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
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : 'https://shielded-caverns-18893.herokuapp.com/admin/player-list';
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
        returnTo: 'https://shielded-caverns-18893.herokuapp.com'
      });
    });
  }//*/
}
