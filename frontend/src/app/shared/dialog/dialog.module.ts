import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogActionDirective } from './directives/dialog-action.directive';
import { DialogActionsDirective } from './directives/dialog-actions.directive';
import { DialogTitleDirective } from './directives/dialog-title.directive';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule
    ],
    declarations: [ DialogComponent, DialogActionsDirective, DialogTitleDirective, DialogActionDirective ],
    exports: [ DialogComponent, DialogActionsDirective, DialogTitleDirective, DialogActionDirective ]
})
export class AppDialogModule {

}
