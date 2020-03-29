import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { ActiveToggleComponent } from './active-toggle.component';

@NgModule({
    imports: [
        CommonModule,
        MatChipsModule,
        MatIconModule
    ],
    declarations: [ ActiveToggleComponent ],
    exports: [ ActiveToggleComponent ]
})
export class AppActiveToggleModule {

}
