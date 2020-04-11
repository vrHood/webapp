import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AppActiveToggleModule } from '../../shared/active-toggle/active-toggle.module';
import { CategoryBadgeModule } from '../../shared/category-badge/category-badge.module';
import { AppChipModule } from '../../shared/chip/chip.module';
import { AppDialogModule } from '../../shared/dialog/dialog.module';
import { AppPageLayoutModule } from '../../shared/page-layout/page-layout.module';
import { AppTableModule } from '../../shared/table/table.module';
import { RetailerDeleteDialogComponent } from './dialogs/delete/retailer-delete-dialog.component';
import { RetailerEditDialogComponent } from './dialogs/edit/retailer-edit-dialog.component';

import { RetailerDetailPage } from './pages/detail/retailer-detail.page';
import { RetailerOverviewPage } from './pages/overview/retailer-overview.page';
import { RETAILER_ROUTES } from './retailer.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RETAILER_ROUTES),
        ReactiveFormsModule,

        MatListModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatChipsModule,
        TranslateModule,

        AppActiveToggleModule,
        AppDialogModule,
        AppPageLayoutModule,
        AppTableModule,
        CategoryBadgeModule,
        AppChipModule
    ],
    declarations: [ RetailerDetailPage, RetailerOverviewPage, RetailerDeleteDialogComponent, RetailerEditDialogComponent ]
})
export class RetailerModule {

}
