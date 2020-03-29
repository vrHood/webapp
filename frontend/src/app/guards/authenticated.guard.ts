import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/authentication-service.class';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

    constructor(private readonly _authService: AuthService,
                private readonly _router: Router) {

    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const isAuthenticated = await this._authService.isAuthenticated();

        if (isAuthenticated) {
            return true;
        }

        await this._authService.silentLogin();

        if (await this._authService.isAuthenticated()) {
            return true;
        }

        return this._router.parseUrl('/admin/auth/login');
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

}
