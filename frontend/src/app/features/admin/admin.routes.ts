import { Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { AdminPage } from './pages/admin/admin.page';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminPage,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'users'
            },
            {
                path: 'auth',
                loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule)
            },
            {
                path: 'users',
                loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
                canActivate: [ AuthGuard ]
            },
            {
                path: 'retailers',
                loadChildren: () => import('../retailer/retailer.module').then((m) => m.RetailerModule),
                canActivate: [ AuthGuard ]
            }
        ]
    }
];
