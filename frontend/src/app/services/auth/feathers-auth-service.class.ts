import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResult } from '@feathersjs/authentication';
import { Application } from '@feathersjs/feathers';
import { IUser } from '@vrhood/shared';
import { fromEvent, merge, Observable } from 'rxjs';
import { map, share, startWith, switchMap } from 'rxjs/operators';

import { FEATHERS } from '../../tokens/feathers.token';

import { AuthService } from './authentication-service.class';

enum FeathersAuthEvent {
    AUTHENTICATED = 'authenticated',
    LOGIN = 'login',
    LOGOUT = 'logout'
}

@Injectable()
export class FeathersAuthService extends AuthService {

    readonly onLogin$: Observable<void>;
    readonly onLogout$: Observable<void>;
    readonly activeUser$: Observable<IUser>;
    readonly isAuthenticated$: Observable<boolean>;

    constructor(@Inject(FEATHERS) private readonly _app: Application,
                private readonly _router: Router) {
        super();

        this.onLogin$ = fromEvent(this._app, FeathersAuthEvent.LOGIN);
        this.onLogout$ = fromEvent(this._app, FeathersAuthEvent.LOGOUT);

        this.activeUser$ = merge(fromEvent(this._app, 'login'), fromEvent(this._app, 'logout'))
            .pipe(
                startWith({}),
                switchMap(() => this.getActiveUser()),
                share()
            );

        this.isAuthenticated$ = this.activeUser$.pipe(map((activeUser) => activeUser != null));
    }

    logout(): Promise<any> {
        return this._app.logout();
    }

    login(email: string, password: string): Promise<any> {
        return this._app.authenticate({
            strategy: 'local',
            email,
            password
        });
    }

    silentLogin(): Promise<any> {
        return this._app.reAuthenticate().catch(() => void 0);
    }

    async isAuthenticated(): Promise<boolean> {
        return (await this.getActiveUser()) != null;
    }

    async getActiveUser(): Promise<IUser> {
        const authPromise: Promise<AuthenticationResult> = this._app.get('authentication');

        if (!authPromise) {
            return null;
        }

        const authData = await authPromise;

        return authData ? authData.user : null;
    }
}
