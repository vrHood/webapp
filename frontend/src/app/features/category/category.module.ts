import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AppActiveToggleModule } from '../../shared/active-toggle/active-toggle.module';
import { CategoryBadgeModule } from '../../shared/category-badge/category-badge.module';
import { ColorBadgeModule } from '../../shared/color-badge/color-badge.module';
import { IconNamePipeModule } from '../../shared/icon-name-pipe/icon-name-pipe.module';
import { AppPageLayoutModule } from '../../shared/page-layout/page-layout.module';

import { AppTableModule } from '../../shared/table/table.module';

import { CATEGORY_ROUTES } from './category.routes';
import { CategoryEditDialogComponent } from './dialogs/edit/category-edit-dialog.component';
import { CategoryDetailPage } from './pages/detail/category-detail.page';
import { CategoryListPage } from './pages/list/category-list.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CATEGORY_ROUTES),
        ReactiveFormsModule,

        MatListModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatInputModule,

        AppTableModule,
        AppPageLayoutModule,
        AppActiveToggleModule,
        ColorBadgeModule,
        CategoryBadgeModule,
        IconNamePipeModule
    ],
    declarations: [ CategoryDetailPage, CategoryListPage, CategoryEditDialogComponent ]
})
export class CategoryModule {

}
