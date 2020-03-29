import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

export type GuardRedirect<T> =
    string
    | UrlTree
    | ((data: T, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => string | UrlTree);
