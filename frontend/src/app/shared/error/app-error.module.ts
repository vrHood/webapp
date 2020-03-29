import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppErrorComponent } from './components/error/app-error.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AppErrorComponent],
    exports: [AppErrorComponent]
})
export class AppErrorModule {
}
