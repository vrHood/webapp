import { Routes } from '@angular/router';

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
        component: LoginPage
    },
    {
        path: 'retailer-registration',
        component: RetailerRegistrationPage
    }
];
