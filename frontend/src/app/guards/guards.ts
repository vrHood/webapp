import { Injectable, Injector, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isObservable, Observable, of } from 'rxjs';
import { isPromise } from 'rxjs/internal-compatibility';
import { concatMap, last, takeWhile } from 'rxjs/operators';

type Guard = CanActivate | CanActivateChild | CanDeactivate<any>;

type GuardCallback<T extends Guard> =
    (guard: T) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable()
export class BaseSequenceGuard implements CanActivate, CanActivateChild, CanDeactivate<any> {

    protected _guards: Type<CanActivate | CanActivateChild | CanDeactivate<any>>[];

    constructor(private readonly _injector: Injector) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this._can<CanActivate>((guard) => guard.canActivate(route, state));
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this._can<CanActivateChild>((guard) => guard.canActivateChild(childRoute, state));
    }

    canDeactivate(component: any,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this._can<CanDeactivate<any>>((guard) => guard.canDeactivate(component, currentRoute, currentState, nextState));
    }

    private _can<T extends Guard>(callback: GuardCallback<T>): Observable<boolean | UrlTree> {
        return of(...this._guards)
            .pipe(
                concatMap((guard: Type<T>) => {
                    const instance: T = this._injector.get(guard);

                    if (!instance) {
                        throw new Error(`Failed to create instance of guard ${guard}`);
                    }

                    const result = callback(instance);

                    if (isPromise(result) || isObservable(result)) {
                        return result;
                    }

                    return of(result);
                }),
                takeWhile((result) => true === result, true),
                last()
            );
    }

}

export class Guards {
    readonly guards: Type<CanActivate>[] = [];

    sequence(...guards: Type<CanActivate>[]): Type<CanActivate>;
    sequence(...guards: Type<CanActivateChild>[]): Type<CanActivateChild>;
    sequence(...guards: Type<CanDeactivate<any>>[]): Type<CanDeactivate<any>>;
    sequence(...guards: Type<Guard>[]): Type<Guard> {
        @Injectable()
        class ConfiguredSequenceGuard extends BaseSequenceGuard {
            _guards = guards;
        }

        this.guards.push(ConfiguredSequenceGuard);
        return ConfiguredSequenceGuard;
    }
}

export namespace Guards {
    const ROOT_GUARDS: Guards = new Guards();

    export function forRoot(): Guards {
        return ROOT_GUARDS;
    }

    export function forFeature(): Guards {
        return new Guards();
    }

}
