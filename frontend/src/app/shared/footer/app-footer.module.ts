import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppFooterComponent } from './components/footer/app-footer.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [AppFooterComponent],
    exports: [AppFooterComponent]
})
export class AppFooterModule {
}
