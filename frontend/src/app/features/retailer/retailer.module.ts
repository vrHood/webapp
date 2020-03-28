import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { OverviewModule } from '../../shared/overview/overview.module';
import { PageLayoutModule } from '../../shared/page-layout/page-layout.module';

import { RetailerDetailComponent } from './components/retailer-detail/retailer-detail.component';
import { RetailerListComponent } from './components/retailer-list/retailer-list.component';
import { RETAILER_ROUTES } from './retailer.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RETAILER_ROUTES),

        MatListModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,

        OverviewModule,
        PageLayoutModule
    ],
    declarations: [ RetailerDetailComponent, RetailerListComponent ]
})
export class RetailerModule {

}
