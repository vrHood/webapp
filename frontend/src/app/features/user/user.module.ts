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

import { OverviewModule } from '../../shared/overview/overview.module';
import { PageLayoutModule } from '../../shared/page-layout/page-layout.module';

import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditDialogComponent } from './dialogs/user-create/user-edit-dialog.component';
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

        OverviewModule,
        PageLayoutModule,
        MatProgressSpinnerModule,
        MatProgressBarModule
    ],
    declarations: [ UserDetailComponent, UserListComponent, UserEditDialogComponent ]
})
export class UserModule {

}
