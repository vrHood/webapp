import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { PageLayoutHeaderComponent } from './components/page-layout-header/page-layout-header.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { PageLayoutHeaderActionDirective } from './directives/page-layout-header-action.directive';
import { PageLayoutHeaderSubtitleDirective } from './directives/page-layout-header-subtitle.directive';
import { PageLayoutHeaderTitleDirective } from './directives/page-layout-header-title.directive';

@NgModule({
    imports: [
        MatIconModule,
        RouterModule,
        MatButtonModule

    ],
    declarations: [
        PageLayoutComponent,
        PageLayoutHeaderComponent,
        PageLayoutHeaderTitleDirective,
        PageLayoutHeaderSubtitleDirective,
        PageLayoutHeaderActionDirective
    ],
    exports: [
        PageLayoutComponent,
        PageLayoutHeaderComponent,
        PageLayoutHeaderTitleDirective,
        PageLayoutHeaderSubtitleDirective,
        PageLayoutHeaderActionDirective
    ]
})
export class PageLayoutModule {

}
