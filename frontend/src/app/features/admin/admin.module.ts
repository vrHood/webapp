import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ADMIN_GUARDS, ADMIN_ROUTES } from './admin.routes';
import { AdminPage } from './pages/admin/admin.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_ROUTES),

        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule
    ],
    declarations: [
        AdminPage
    ],
    providers: [
        ...ADMIN_GUARDS.guards
    ]
})
export class AdminModule {

}
