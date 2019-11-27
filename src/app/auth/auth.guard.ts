import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    return this.isLogedin();
     
  }

  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {  
    return this.isLogedin();
  }
 
  constructor(private authService: AuthService, private router: Router) {}
  isLogedin(): boolean {
    if (this.authService.loggedIn) {
       return true; 
     } else {
      this.router.navigate(['/player-rankings']);
      return false;
    }
  }
}
