import { Routes } from '@angular/router';

import { ContentPage } from './pages/content/content.page';

export const CONTENT_ROUTES: Routes = [
    {
        path: '',
        component: ContentPage,
        children: [
            {
                path: 'retailer',
                loadChildren: () => import('../retailer/retailer.module').then((m) => m.RetailerModule)
            }
        ]
    }
];
