import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/authentication-service.class';
import { FeathersAuthService } from './services/auth/feathers-auth-service.class';
import { DataServiceFactory } from './services/data/data-service-factory.class';
import { FeathersDataServiceFactory } from './services/data/feathers-data-service-factory.class';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.lang.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        MatSnackBarModule,
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
        { provide: AuthService, useClass: FeathersAuthService }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
