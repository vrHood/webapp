import { Routes } from '@angular/router';

import { UserDetailPage } from './pages/detail/user-detail.page';
import { UserOverviewPage } from './pages/overview/user-overview.page';

export const USER_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserOverviewPage
    },
    {
        path: ':id',
        component: UserDetailPage
    }
];
