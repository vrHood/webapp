import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { ADMIN_ROUTES } from './admin.routes';
import { AdminPage } from './pages/admin/admin.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_ROUTES),

        MatButtonModule,
        MatListModule,
        MatIconModule
    ],
    declarations: [
        AdminPage
    ]
})
export class AdminModule {

}
