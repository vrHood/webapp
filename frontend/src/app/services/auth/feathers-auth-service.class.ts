import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResult } from '@feathersjs/authentication';
import { Application } from '@feathersjs/feathers';

import { FEATHERS } from '../../tokens/feathers.token';

import { AuthService } from './authentication-service.class';

@Injectable()
export class FeathersAuthService extends AuthService {

    constructor(@Inject(FEATHERS) private readonly _app: Application,
                private readonly _router: Router) {
        super();

        this._app.on('authenticated', () => this._router.navigateByUrl('/admin'))
    }

    login(email: string, password: string): Promise<any> {
        return this._app.authenticate({
            strategy: 'local',
            email,
            password
        });
    }

    silentLogin(): Promise<any> {
        return this._app.reAuthenticate();
    }

    async isAuthenticated(): Promise<boolean> {
        const authPromise: Promise<AuthenticationResult> = this._app.get('authentication');

        if (!authPromise) {
            return false;
        }

        const authData = await authPromise;

        return authData != null && authData.user != null;
    }
}
