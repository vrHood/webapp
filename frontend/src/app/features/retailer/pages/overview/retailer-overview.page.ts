import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IRetailer } from '@vrhood/shared';

import { RetailerService } from '../../../../services/retailer.service';
import { RetailerDeleteDialogComponent } from '../../dialogs/delete/retailer-delete-dialog.component';
import { RetailerEditDialogComponent, RetailerEditMode } from '../../dialogs/edit/retailer-edit-dialog.component';

@Component({
    selector: 'app-retailer-overview-page',
    templateUrl: './retailer-overview.page.html',
    styleUrls: [ './retailer-overview.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-retailer-overview-page'
    }
})
export class RetailerOverviewPage implements OnInit {

    displayedColumns = [ 'name', 'email', 'mainCategory', 'active', 'edit', 'delete' ];

    constructor(readonly retailerService: RetailerService,
                private readonly _matDialog: MatDialog,
                private readonly _activatedRoute: ActivatedRoute,
                private readonly _router: Router,
                private readonly _viewContainerRef: ViewContainerRef) {

    }

    ngOnInit() {

    }

    edit(retailer: IRetailer) {
        RetailerEditDialogComponent.show(this._matDialog, { mode: RetailerEditMode.EDIT, retailer }, this._viewContainerRef);
    }

    delete(retailer: IRetailer) {
        RetailerDeleteDialogComponent.show(this._matDialog, { retailer });
    }

    addRetailer() {
        RetailerEditDialogComponent.show(this._matDialog, { mode: RetailerEditMode.CREATE }, this._viewContainerRef);
    }

    openDetail(retailer: IRetailer) {
        console.log('RetailerListComponent openDetail()', retailer);
        this._router.navigate([ '.', retailer._id ], { relativeTo: this._activatedRoute });
    }

}
