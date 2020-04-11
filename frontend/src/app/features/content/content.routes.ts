import { Routes } from '@angular/router';
import { EntityResolver } from '../../resolver/entity.resovler';
import { RetailerService } from '../../services/retailer.service';

import { ContentPage } from './pages/content/content.page';

export const CONTENT_ROUTES: Routes = [
    {
        path: '',
        component: ContentPage,
        runGuardsAndResolvers: 'always'
        /*children: [
            {
                path: 'retailer',
                loadChildren: () => import('../retailer/retailer.module').then((m) => m.RetailerModule)
            }
        ]*/
    },
    {
        path: ':retailerId',
        component: ContentPage,
        data: {
            entityResolver: {
                idField: 'params.retailerId',
                service: RetailerService
            }
        },
        resolve: {
            retailer: EntityResolver
        }
    }
];
