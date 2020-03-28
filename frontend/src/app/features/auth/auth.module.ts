import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { AUTH_ROUTES } from './auth.routes';
import { LoginPage } from './pages/login/login.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AUTH_ROUTES),
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    declarations: [
        LoginPage
    ]
})
export class AuthModule {

}
