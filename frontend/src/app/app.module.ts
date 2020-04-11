import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Guards } from './guards/guards';
import { AuthService } from './services/auth/authentication-service.class';
import { FeathersAuthService } from './services/auth/feathers-auth-service.class';
import { DataServiceFactory } from './services/data/data-service-factory.class';
import { FeathersDataServiceFactory } from './services/data/feathers-data-service-factory.class';
import { IconUtils } from './utils/icon.utils';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.lang.json');
}

export function init() {
    const registry = inject(MatIconRegistry);
    // @ts-ignore
    const sanitizer = inject(DomSanitizer);
    return () => IconUtils.addIcons(registry, sanitizer);
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        MatSnackBarModule,
        MatIconModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [ HttpClient ]
            },
            defaultLanguage: 'de'
        }),

        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: DataServiceFactory, useClass: FeathersDataServiceFactory },
        { provide: AuthService, useClass: FeathersAuthService },
        { provide: APP_INITIALIZER, useFactory: init, multi: true },
        Guards.forRoot().guards
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
