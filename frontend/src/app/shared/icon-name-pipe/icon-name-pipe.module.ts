import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconNamePipe } from './icon-name.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        IconNamePipe
    ],
    exports: [
        IconNamePipe
    ]
})
export class IconNamePipeModule {
}
