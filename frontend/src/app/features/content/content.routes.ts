import { Routes } from '@angular/router';
import { RetailerDetailComponent } from './components/retailer-detail/retailer-detail.component';
import { RetailerListComponent } from './components/retailer-list/retailer-list.component';

import { ContentPage } from './pages/content/content.page';

export const CONTENT_ROUTES: Routes = [
    {
        path: '',
        component: ContentPage,
        children: [
            {
                path: 'retailer',
                children: [
                    {
                        path: ':id',
                        component: RetailerDetailComponent
                    },
                    {
                        path: '',
                        component: RetailerListComponent
                    }
                ]
            }
        ]
    }
];
