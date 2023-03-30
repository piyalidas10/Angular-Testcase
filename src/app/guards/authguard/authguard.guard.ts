import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
    // return this.auth.user$.pipe(
    //   tap((user) => {
    //     if (!user) {
    //       console.log('user not found in guard');
    //       this.router.navigateByUrl('/login');
    //     }
    //   }),
    //   map((user) => (user ? true : false))
    // );
  }
  
}
