import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
    DELIVERY_AREA_TRANSLATE_VALUES,
    DeliveryArea,
    IRetailer,
    ORDER_TYPE_TRANSLATE_VALUES,
    OrderType,
    PAYMENT_TYPE_TRANSLATE_VALUES,
    PaymentType,
    TranslateValues
} from '@vrhood/shared';
import { Subject } from 'rxjs';
import { pluck, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { RetailerService } from '../../../../services/retailer.service';
import { RetailerDeleteDialogComponent } from '../../dialogs/delete/retailer-delete-dialog.component';
import { RetailerEditDialogComponent, RetailerEditMode } from '../../dialogs/edit/retailer-edit-dialog.component';

@Component({
    selector: 'app-retailer-detail-page',
    templateUrl: './retailer-detail.page.html',
    styleUrls: [ './retailer-detail.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-retailer-detail-page'
    }
})
export class RetailerDetailPage implements OnInit, OnDestroy {

    readonly orderTypeLabels: TranslateValues<OrderType> = ORDER_TYPE_TRANSLATE_VALUES;
    readonly paymentTypeLabels: TranslateValues<PaymentType> = PAYMENT_TYPE_TRANSLATE_VALUES;
    readonly deliveryAreaLabels: TranslateValues<DeliveryArea> = DELIVERY_AREA_TRANSLATE_VALUES;

    retailer: IRetailer;
    active = true;

    private readonly _onDestroy = new Subject();

    constructor(readonly retailerService: RetailerService,
                private readonly _activateRoute: ActivatedRoute,
                private readonly _matDialog: MatDialog,
                private readonly _changeDetector: ChangeDetectorRef) {
        this.retailer = _activateRoute.snapshot.data.entity;
    }

    ngOnInit() {
        this._activateRoute.data.pipe(
            pluck('entity'),
            switchMap((retailer: IRetailer) => {
                return this.retailerService.get(retailer._id).pipe(startWith(retailer));
            }),
            takeUntil(this._onDestroy)
        ).subscribe((retailer) => {
            this.retailer = retailer;
            this._changeDetector.detectChanges();
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    edit() {
        RetailerEditDialogComponent.show(this._matDialog, { mode: RetailerEditMode.EDIT, retailer: this.retailer });
    }

    delete() {
        RetailerDeleteDialogComponent.show(this._matDialog, { retailer: this.retailer });
    }

}
