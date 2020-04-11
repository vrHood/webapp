import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ExternalScript, ScriptLoader } from '../services/script-loader.tservice';

import { Guards } from './guards';

type LoadScriptGuardOptions = ExternalScript | ExternalScript[];

@Injectable({
    providedIn: 'root'
})
export class ScriptGuard implements CanActivate, CanActivateChild {

    static load(options: LoadScriptGuardOptions, guards: Guards = Guards.forRoot()): Type<ScriptGuard> {

        @Injectable()
        class ConfiguredLoadScriptGuard extends ScriptGuard {
            _options = options;
        }

        guards.guards.push(ConfiguredLoadScriptGuard);
        return ConfiguredLoadScriptGuard;
    }

    static forFeature(guards: Guards) {
        return {
            load: (options: LoadScriptGuardOptions) => ScriptGuard.load(options, guards)
        };
    }

    _options?: LoadScriptGuardOptions;

    constructor(private readonly _scriptLoader: ScriptLoader,
                private readonly _router: Router) {

    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const options: LoadScriptGuardOptions = this._options || route.data.scriptGuard;

        try {
            if (Array.isArray(options)) {
                await this._scriptLoader.loadAll(...options);
            } else if ('string' === typeof options) {
                await this._scriptLoader.load(options);
            }

            return true;
        } catch (e) {
            console.error(`ScriptLoader failed to load ${options}`, e);
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

}
