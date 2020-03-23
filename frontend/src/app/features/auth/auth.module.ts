import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AUTH_ROUTES } from './auth.routes';
import { LoginPage } from './pages/login/login.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AUTH_ROUTES)
    ],
    declarations: [
        LoginPage
    ]
})
export class AuthModule {

}
