import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isFunction as _isFunction } from 'lodash';

import { GuardRedirect } from '../models/guard-redirect';

export namespace RouterUtils {

    export function redirect<T>(router: Router, data: T, route: ActivatedRouteSnapshot, state: RouterStateSnapshot, guardRedirect: GuardRedirect<T>): UrlTree {
        if (_isFunction(guardRedirect)) {
            guardRedirect = guardRedirect(data, route, state);
        }

        return guardRedirect instanceof UrlTree ? guardRedirect : this._router.parseUrl(guardRedirect);
    }
}
