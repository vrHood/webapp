import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { CategoryBadgeModule } from '../../shared/category-badge/category-badge.module';

import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { MapComponent } from './components/map/map.component';
import { RetailerInfoComponent } from './components/retailer-info/retailer-info.component';
import { RetailerListComponent } from './components/retailer-list/retailer-list.component';
import { CONTENT_ROUTES } from './content.routes';
import { RetailerInfoCloseButtonDirective } from './directives/retailer-info-close-button.directive';
import { ContentPage } from './pages/content/content.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CONTENT_ROUTES),

        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        CategoryBadgeModule,
        MatListModule,
        GoogleMapsModule,
        MatCardModule
    ],
    declarations: [
        ContentPage,
        CategoryListComponent,
        RetailerListComponent,
        MapComponent,
        RetailerInfoComponent,
        RetailerInfoCloseButtonDirective,
        CategoryListItemComponent
    ]
})
export class ContentModule {

}
