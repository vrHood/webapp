import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AppActiveToggleModule } from '../../shared/active-toggle/active-toggle.module';
import { AppPageLayoutModule } from '../../shared/page-layout/page-layout.module';

import { AppTableModule } from '../../shared/table/table.module';
import { UserEditDialogComponent } from './dialogs/edit/user-edit-dialog.component';

import { UserDetailPage } from './pages/detail/user-detail.page';
import { UserOverviewPage } from './pages/overview/user-overview.page';
import { USER_ROUTES } from './user.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(USER_ROUTES),
        ReactiveFormsModule,

        MatDialogModule,
        MatListModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,

        AppTableModule,
        AppPageLayoutModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        AppActiveToggleModule
    ],
    declarations: [ UserDetailPage, UserOverviewPage, UserEditDialogComponent ]
})
export class UserModule {

}
