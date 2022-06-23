import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('CanActivate', this.authService.auth.id ? true : false);
    console.log('ruta', route);
    console.log('RouterStateSnapshot', state);
    // return (this.authService.auth.id)? true: false;
    return this.authService.verificaAutenticacion().pipe(
      tap((tieneAcceso) => {
        if (!tieneAcceso) {
          this.router.navigate(['./auth']);
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanLoad', this.authService.auth.id ? true : false);
    console.log('ruta', route);
    console.log('segements', segments);
    // return (this.authService.auth.id)? true: false;
    return this.authService.verificaAutenticacion().pipe(
      tap((tieneAcceso) => {
        if (!tieneAcceso) {
          this.router.navigate(['./auth']);
        }
      })
    );
  }
}
