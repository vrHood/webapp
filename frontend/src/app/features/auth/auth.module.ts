import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { AppErrorModule } from '../../shared/error/app-error.module';
import { AppFooterModule } from '../../shared/footer/app-footer.module';
import { AUTH_ROUTES } from './auth.routes';
import { RetailerRegistrationFormComponent } from './components/retailer-registration-form/retailer-registration-form.component';
import { LoginPage } from './pages/login/login.page';
import { RetailerRegistrationPage } from './pages/retailer-registration/retailer-registration.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AUTH_ROUTES),
        ReactiveFormsModule,

        // Material
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule,
        MatTabsModule,
        MatSnackBarModule,

        // App
        AppErrorModule,
        AppFooterModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatIconModule
    ],
    declarations: [
        LoginPage,
        RetailerRegistrationPage,
        RetailerRegistrationFormComponent
    ]
})
export class AuthModule {

}
