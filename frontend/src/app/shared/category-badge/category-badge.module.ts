import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IconNamePipeModule } from '../icon-name-pipe/icon-name-pipe.module';
import { CategoryBadgeComponent } from './category-badge.component';



@NgModule({
    declarations: [ CategoryBadgeComponent ],
    exports: [
        CategoryBadgeComponent
    ],
    imports: [
        CommonModule,
        MatChipsModule,
        MatIconModule,
        IconNamePipeModule
    ]
})
export class CategoryBadgeModule { }
