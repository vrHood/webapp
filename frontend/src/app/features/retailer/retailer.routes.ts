import { Routes } from '@angular/router';

import { RetailerDetailComponent } from './components/retailer-detail/retailer-detail.component';
import { RetailerListComponent } from './components/retailer-list/retailer-list.component';

export const RETAILER_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RetailerListComponent
    },
    {
        path: ':id',
        component: RetailerDetailComponent
    }
];
