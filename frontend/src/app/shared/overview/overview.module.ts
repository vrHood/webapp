import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule
    ],
    declarations: [ OverviewComponent ],
    exports: [ OverviewComponent ]
})
export class OverviewModule {
}
