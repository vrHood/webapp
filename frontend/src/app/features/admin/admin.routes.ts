import { Routes } from '@angular/router';
import { UserRole } from '@vrhood/shared';

import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { Guards } from '../../guards/guards';
import { RoleGuard } from '../../guards/role.guard';

import { AdminPage } from './pages/admin/admin.page';

export const ADMIN_GUARDS = Guards.forFeature();

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminPage,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'auth'
            },
            {
                path: '',
                canActivateChild: [
                    ADMIN_GUARDS.sequence(
                        AuthenticatedGuard,
                        RoleGuard.forFeature(ADMIN_GUARDS).whitelist(UserRole.ADMIN)
                    )
                ],
                children: [
                    {
                        path: 'users',
                        loadChildren: () => import('../user/user.module').then((m) => m.UserModule)
                    },
                    {
                        path: 'retailers',
                        loadChildren: () => import('../retailer/retailer.module').then((m) => m.RetailerModule)
                    },
                    {
                        path: 'categories',
                        loadChildren: () => import('../category/category.module').then((m) => m.CategoryModule)
                    }
                ]
            }
        ]
    }
];
