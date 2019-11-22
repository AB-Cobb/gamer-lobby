import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean>  {
    return this.isLogedin()
  }

  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {  
    return this.canActivate(route, state);
  }
 
  constructor(private authService: AuthService, private router: Router) {}
  isLogedin(): boolean {
    if (this.authService.isLoggedIn) {
       return true; 
     } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
