import { Routes } from '@angular/router';

import { CategoryDetailPage } from './pages/detail/category-detail.page';
import { CategoryListPage } from './pages/list/category-list.page';

export const CATEGORY_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CategoryListPage
    },
    {
        path: ':id',
        component: CategoryDetailPage
    }
];
