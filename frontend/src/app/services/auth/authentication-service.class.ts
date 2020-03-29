import { IUser } from '@vrhood/shared';
import { Observable } from 'rxjs';

export abstract class AuthService {

    readonly onLogin$: Observable<void>;

    readonly onLogout$: Observable<void>;

    readonly isAuthenticated$: Observable<boolean>;

    readonly activeUser$: Observable<IUser>;

    abstract logout(): Promise<any>;

    abstract login(email: string, password: string): Promise<any>;

    abstract silentLogin(): Promise<any>;

    abstract isAuthenticated(): Promise<boolean>;

    abstract getActiveUser(): Promise<IUser>;

}
