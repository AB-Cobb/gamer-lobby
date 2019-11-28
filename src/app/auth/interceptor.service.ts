import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService,  } from './auth.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (this.authService.loggedIn){
      return this.authService.getTokenSilently$().pipe(mergeMap(token => {
        const tokenRequest = req.clone({ setHeaders: {Authorisation: 'Bearer ${token}'}});
        return next.handle(tokenRequest);
      }),
      catchError(err => throwError(err))
      );
    } else {
    return next.handle(req);
    }
  }
  constructor(private authService: AuthService) {
    //do something
  }
}
