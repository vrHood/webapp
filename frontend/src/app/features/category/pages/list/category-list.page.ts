import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from '@vrhood/shared';

import { CategoryService } from '../../../../services/category.service';
import { CategoryEditDialogComponent, CategoryEditMode } from '../../dialogs/edit/category-edit-dialog.component';

@Component({
    selector: 'app-category-list-page',
    templateUrl: './category-list.page.html',
    styleUrls: [ './category-list.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-category-list-page'
    }
})
export class CategoryListPage implements OnInit {

    displayedColumns = [ 'icon', 'icon-name', 'name', 'active', 'edit', 'delete' ];

    constructor(readonly categoryService: CategoryService,
                private readonly _matDialog: MatDialog,
                private readonly _viewContainerRef: ViewContainerRef) {

    }

    ngOnInit(): void {
    }


    edit(category: ICategory) {
        CategoryEditDialogComponent.show(this._matDialog, { mode: CategoryEditMode.EDIT, category }, this._viewContainerRef);
    }

    delete(category: ICategory) {
        CategoryEditDialogComponent.show(this._matDialog, { mode: CategoryEditMode.DELETE, category }, this._viewContainerRef);
    }

    addRetailer() {
        CategoryEditDialogComponent.show(this._matDialog, { mode: CategoryEditMode.CREATE }, this._viewContainerRef);
    }

}
