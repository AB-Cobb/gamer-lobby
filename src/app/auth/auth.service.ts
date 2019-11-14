import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;

  logout(): void {
    this.isLoggedIn = false;
  }

  login(data): Observable<any>{
    if (data['username'] == 'root' && data['password'] == 'sw0rdfish'){
      this.isLoggedIn = true;
      return of(true);
    } else {
      return of(false)
    }
  }

  redirect: string;

  constructor(private authService: AuthService) { }
}
