import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RetailerDetailComponent } from './components/retailer-detail/retailer-detail.component';
import { RetailerListComponent } from './components/retailer-list/retailer-list.component';
import { RETAILER_ROUTES } from './retailer.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RETAILER_ROUTES)
    ],
    declarations: [ RetailerDetailComponent, RetailerListComponent ]
})
export class RetailerModule {

}
