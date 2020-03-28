import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DataPageComponent } from './components/data-page/data-page.component';

@NgModule({
    imports: [
        MatIconModule,
        RouterModule,
        MatButtonModule

    ],
    declarations: [

    DataPageComponent],
    exports: [
        DataPageComponent

    ]
})
export class DataPageModule {

}
