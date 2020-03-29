import { Routes } from '@angular/router';
import { IUser, UserRole } from '@vrhood/shared';

import { RedirectAuthenticatedGuard } from '../../guards/redirect-authenticated.guard';

import { LoginPage } from './pages/login/login.page';
import { RetailerRegistrationPage } from './pages/retailer-registration/retailer-registration.page';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginPage,
        data: {
            redirectAuthenticatedTo: (user: IUser) => {
                return UserRole.ADMIN === user.role ? '/admin/users' : '/';
            }
        },
        canActivate: [RedirectAuthenticatedGuard]
    },
    {
        path: 'retailer-registration',
        component: RetailerRegistrationPage
    }
];
