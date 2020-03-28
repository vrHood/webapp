import { Routes } from '@angular/router';

import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const USER_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserListComponent
    },
    {
        path: ':id',
        component: UserDetailComponent
    }
];
