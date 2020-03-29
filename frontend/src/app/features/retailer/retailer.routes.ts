import { Routes } from '@angular/router';
import { EntityResolver } from '../../resolver/entity.resovler';
import { RetailerService } from '../../services/retailer.service';

import { RetailerDetailPage } from './pages/detail/retailer-detail.page';
import { RetailerOverviewPage } from './pages/overview/retailer-overview.page';

export const RETAILER_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RetailerOverviewPage
    },
    {
        path: ':id',
        component: RetailerDetailPage,
        data: {
            entityResolver: {
                service: RetailerService
            }
        },
        resolve: {
            entity: EntityResolver
        }

    }
];
