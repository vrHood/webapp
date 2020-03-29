import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IUser, UserRole, UserUtils } from '@vrhood/shared';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/authentication-service.class';
import { GuardRedirect } from '../models/guard-redirect';
import { RouterUtils } from '../utils/router.utils';

import { Guards } from './guards';

interface RoleGuardCreateOptions {
    roles: UserRole | UserRole[];
    failureRedirect?: GuardRedirect<IUser>;
}

type RoleGuardCreateOptionsLike = UserRole | UserRole[] | RoleGuardCreateOptions;

interface RoleGuardOptions {
    whitelist?: UserRole | UserRole[];
    blacklist?: UserRole | UserRole[];
    failureRedirect?: GuardRedirect<IUser>;
}

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

    static create(options: RoleGuardOptions, guards: Guards = Guards.forRoot()): Type<RoleGuard> {

        @Injectable()
        class ConfiguredRoleGuard extends RoleGuard {
            _options = options;
        }

        guards.guards.push(ConfiguredRoleGuard);
        return ConfiguredRoleGuard;
    }

    static whitelist(options: RoleGuardCreateOptionsLike, guards: Guards = Guards.forRoot()): Type<RoleGuard> {
        if ('string' === typeof options || Array.isArray(options)) {
            return RoleGuard.create({ whitelist: options }, guards);
        }

        return RoleGuard.create({ whitelist: options.roles, failureRedirect: options.failureRedirect }, guards);
    }

    static blacklist(options: RoleGuardCreateOptionsLike, guards: Guards = Guards.forRoot()): Type<RoleGuard> {
        if ('string' === typeof options || Array.isArray(options)) {
            return RoleGuard.create({ blacklist: options }, guards);
        }

        return RoleGuard.create({ blacklist: options.roles, failureRedirect: options.failureRedirect }, guards);
    }

    static forFeature(guards: Guards) {
        return {
            create: (options: RoleGuardOptions) => RoleGuard.create(options, guards),
            whitelist: (options: RoleGuardCreateOptionsLike) => RoleGuard.whitelist(options, guards),
            blacklist: (options: RoleGuardCreateOptionsLike) => RoleGuard.blacklist(options, guards)
        };
    }

    _options?: RoleGuardOptions;

    constructor(private readonly _authService: AuthService,
                private readonly _router: Router) {

    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const activeUser: IUser = await this._authService.getActiveUser();
        const options: RoleGuardOptions = this._options || route.data.roleGuard;

        if (options.whitelist) {
            if (UserUtils.hasAnyRole(activeUser, options.whitelist)) {
                return true;
            }

            return options.failureRedirect ? RouterUtils.redirect(this._router, activeUser, route, state, options.failureRedirect) : false;
        } else if (options.blacklist) {
            if (!UserUtils.hasAnyRole(activeUser, options.whitelist)) {
                return true;
            }

            return options.failureRedirect ? RouterUtils.redirect(this._router, activeUser, route, state, options.failureRedirect) : false;
        }

        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

}
