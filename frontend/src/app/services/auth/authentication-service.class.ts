export abstract class AuthService {

    abstract login(email: string, password: string): Promise<any>;

    abstract silentLogin(): Promise<any>;

    abstract isAuthenticated(): Promise<boolean>;
}
