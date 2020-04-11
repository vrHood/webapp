import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { ColorBadgeComponent } from './color-badge.component';

@NgModule({
    imports: [
        CommonModule,
        MatChipsModule
    ],
    declarations: [ ColorBadgeComponent ],
    exports: [ ColorBadgeComponent ]
})
export class ColorBadgeModule {
}
