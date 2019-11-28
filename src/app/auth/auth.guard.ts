import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    return this.authService.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/404']);
          //this.authService.login(state.url);
        }
      })
    );
     
  }

  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean|UrlTree> | boolean {  
    return this.canActivate(route, state);
  }
 
  constructor(private authService: AuthService, private router: Router) {}
  /*isLogedin(): boolean {
    if (this.authService.loggedIn) {
       return true; 
     } else {
      this.router.navigate(['/player-rankings']);
      return false;
    }
  }*/
}
