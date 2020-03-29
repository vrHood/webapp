import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IUser } from '@vrhood/shared';
import { isFunction as _isFunction } from 'lodash';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/authentication-service.class';
import { GuardRedirect } from '../models/guard-redirect';

@Injectable({
    providedIn: 'root'
})
export class RedirectAuthenticatedGuard implements CanActivate, CanActivateChild {

    constructor(private readonly _authService: AuthService,
                private readonly _router: Router) {

    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        await this._authService.silentLogin();

        const activeUser = await this._authService.getActiveUser();

        if (activeUser != null) {
            let redirectTo: GuardRedirect<IUser> = route.data.redirectAuthenticatedTo;

            if (_isFunction(redirectTo)) {
                redirectTo = redirectTo(activeUser, route, state);
            }

            console.log('RedirectAuthenticatedGuard redirectTo', redirectTo);
            return redirectTo instanceof UrlTree ? redirectTo : this._router.parseUrl(redirectTo);
        }

        console.log('RedirectAuthenticatedGuard don\'t redirect');
        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

}
