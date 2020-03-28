import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/authentication-service.class';
import { FeathersAuthService } from './services/auth/feathers-auth-service.class';
import { DataServiceFactory } from './services/data/data-service-factory.class';
import { FeathersDataServiceFactory } from './services/data/feathers-data-service-factory.class';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,

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
