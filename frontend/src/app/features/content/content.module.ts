import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { CONTENT_ROUTES } from './content.routes';
import { ContentPage } from './pages/content/content.page';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CONTENT_ROUTES),

        MatSidenavModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [ ContentPage ]
})
export class ContentModule {

}
