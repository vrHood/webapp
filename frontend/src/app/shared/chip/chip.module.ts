import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChipLeadingIconDirective } from './chip-leading-icon.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ ChipLeadingIconDirective ],
    exports: [ ChipLeadingIconDirective ]
})
export class AppChipModule {
}
