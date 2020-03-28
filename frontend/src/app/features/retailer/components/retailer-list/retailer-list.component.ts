import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRetailer } from '@vrhood/shared';

import { RetailerService } from '../../../../services/retailer.service';
import { UserEditDialogComponent, UserEditMode } from '../../../user/dialogs/user-create/user-edit-dialog.component';

@Component({
    selector: 'app-retailer-list',
    templateUrl: './retailer-list.component.html',
    styleUrls: [ './retailer-list.component.scss' ]
})
export class RetailerListComponent implements OnInit {

    displayedColumns = [ 'name', 'email', 'actions' ];

    constructor(readonly retailerService: RetailerService,
                private readonly _matDialog: MatDialog,
                private readonly _viewContainerRef: ViewContainerRef) {

    }

    ngOnInit(): void {
    }


    edit(retailer: IRetailer) {
        UserEditDialogComponent.show(this._matDialog, { mode: UserEditMode.EDIT }, this._viewContainerRef);
    }

    delete(retailer: IRetailer) {
        UserEditDialogComponent.show(this._matDialog, { mode: UserEditMode.DELETE }, this._viewContainerRef);
    }

    addRetailer() {
        UserEditDialogComponent.show(this._matDialog, { mode: UserEditMode.CREATE }, this._viewContainerRef);
    }

}
