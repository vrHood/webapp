import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './components/table/table.component';
import { OverviewTableDirective } from './directives/overview-table.directive';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule
    ],
    declarations: [ TableComponent, OverviewTableDirective ],
    exports: [ TableComponent, OverviewTableDirective ]
})
export class AppTableModule {
}
