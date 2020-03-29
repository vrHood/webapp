import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    DELIVERY_AREA_SELECT_VALUES,
    DELIVERY_AREA_TRANSLATE_VALUES,
    DeliveryArea,
    IRetailer,
    ORDER_TYPE_SELECT_VALUES,
    ORDER_TYPE_TRANSLATE_VALUES,
    OrderType,
    PAYMENT_TYPE_SELECT_VALUES,
    PAYMENT_TYPE_TRANSLATE_VALUES,
    PaymentType,
    SelectValues,
    TranslateValues
} from '@vrhood/shared';
import { includes as _includes, pull as _pull } from 'lodash';

import { RetailerService } from '../../../../services/retailer.service';

export enum RetailerEditMode {
    CREATE = 'create',
    EDIT = 'edit',
    DELETE = 'delete'
}

export interface RetailerEditDialogData {
    mode: RetailerEditMode;
    retailer?: IRetailer;
}

@Component({
    selector: 'app-retailer-edit-dialog',
    templateUrl: './retailer-edit-dialog.component.html',
    styleUrls: [ './retailer-edit-dialog.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-retailer-edit-dialog'
    }
})
export class RetailerEditDialogComponent implements OnInit {

    static show(dialog: MatDialog, data: RetailerEditDialogData, viewContainerRef?: ViewContainerRef): MatDialogRef<RetailerEditDialogComponent> {
        return dialog.open<RetailerEditDialogComponent, RetailerEditDialogData>(
            RetailerEditDialogComponent,
            {
                data,
                viewContainerRef,
                minWidth: '700px',
                maxHeight: '1000px'
            }
        );
    }

    readonly separatorKeysCodes = [ ENTER, COMMA ];
    readonly orderTypes: SelectValues<OrderType> = ORDER_TYPE_SELECT_VALUES;
    readonly paymentTypes: SelectValues<PaymentType> = PAYMENT_TYPE_SELECT_VALUES;
    readonly deliveryAreas: SelectValues<DeliveryArea> = DELIVERY_AREA_SELECT_VALUES;
    readonly orderTypeLabels: TranslateValues<OrderType> = ORDER_TYPE_TRANSLATE_VALUES;
    readonly paymentTypeLabels: TranslateValues<PaymentType> = PAYMENT_TYPE_TRANSLATE_VALUES;
    readonly deliveryAreaLabels: TranslateValues<DeliveryArea> = DELIVERY_AREA_TRANSLATE_VALUES;

    isSaving: boolean;
    mode: RetailerEditMode;
    retailer?: IRetailer;

    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) data: RetailerEditDialogData,
                readonly changeDetector: ChangeDetectorRef,
                private readonly _retailerService: RetailerService,
                private readonly _dialogRef: MatDialogRef<RetailerEditDialogComponent>) {
        this.mode = data.mode;
        this.retailer = data.retailer;
    }

    get hasOtherOrderType() {
        const orderTypes = this.form ? this.form.get('orderTypes').value : null;
        return orderTypes != null && _includes(orderTypes, OrderType.OTHER);
    }

    get hasOtherPaymentType() {
        const paymentTypes = this.form ? this.form.get('paymentTypes').value : null;
        return paymentTypes != null && _includes(paymentTypes, PaymentType.OTHER);
    }

    get hasOtherDeliveryArea() {
        const deliveryAreas = this.form ? this.form.get('deliveryAreas').value : null;
        return deliveryAreas != null && _includes(deliveryAreas, DeliveryArea.OTHER);
    }

    ngOnInit() {

        this._initForm();

    }

    removeSelectValue(formControlName: string, value: any) {
        console.log('RetailerEditDialogComponent removeSelectValue', formControlName, value);
        const formControl = this.form ? this.form.get(formControlName) : null;

        console.log('RetailerEditDialogComponent removeSelectValue formControl', formControl);
        if (!formControl) {
            return;
        }

        console.log('RetailerEditDialogComponent removeSelectValue formControl.value before', [ ...formControl.value ]);
        _pull(formControl.value, value);
        console.log('RetailerEditDialogComponent removeSelectValue formControl.value after', [ ...formControl.value ]);
        this.changeDetector.detectChanges();
    }

    onCancel() {
        this._dialogRef.close();
    }

    onDelete() {
        this._retailerService.remove(this.retailer._id)
            .then((result) => this.onSuccess(result))
            .catch((error) => this.onError(error));
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }

        const formData = this.form.value;

        const requestData: Partial<IRetailer> = {
            ...formData
        };

        this.isSaving = true;
        this.form.disable();
        this.changeDetector.detectChanges();

        switch (this.mode) {
            case RetailerEditMode.CREATE:
                this._retailerService.create(requestData)
                    .then((result) => this.onSuccess(result))
                    .catch((error) => this.onError(error));
                break;
            case RetailerEditMode.EDIT:
                this._retailerService.patch(this.retailer._id, requestData)
                    .then((result) => this.onSuccess(result))
                    .catch((error) => this.onError(error));
                break;
        }
    }

    onSuccess(result: IRetailer) {
        console.log('RetailerEditDialogComponent onSuccess', result, this);
        this._dialogRef.close({ result });
    }

    onError(error: any) {
        console.error('RetailerEditDialogComponent onError', error, this);
        this._dialogRef.close({ error });
    }

    private _initForm() {
        switch (this.mode) {
            case RetailerEditMode.CREATE:
                this.form = new FormGroup({
                    name: new FormControl(null, [ Validators.required ]),
                    website: new FormControl(),
                    facebook: new FormControl(),
                    instagram: new FormControl(),
                    phone: new FormControl(),
                    mobile: new FormControl(),
                    fax: new FormControl(),
                    email: new FormControl(null, [ Validators.required, Validators.email ]),
                    description: new FormControl(null, [ Validators.required ]),
                    offer: new FormControl(null, [ Validators.required ]),
                    orderTypes: new FormControl(),
                    otherOrderType: new FormControl(),
                    paymentTypes: new FormControl(),
                    otherPaymentType: new FormControl(),
                    deliveryAreas: new FormControl(),
                    otherDeliveryArea: new FormControl()
                });
                return;
            case RetailerEditMode.EDIT:
                this.form = new FormGroup({
                    name: new FormControl(this.retailer.name, [ Validators.required ]),
                    website: new FormControl(this.retailer.website),
                    facebook: new FormControl(this.retailer.facebook),
                    instagram: new FormControl(this.retailer.instagram),
                    phone: new FormControl(this.retailer.phone),
                    mobile: new FormControl(this.retailer.mobile),
                    fax: new FormControl(this.retailer.fax),
                    email: new FormControl(this.retailer.email, [ Validators.required, Validators.email ]),
                    description: new FormControl(this.retailer.description, [ Validators.required ]),
                    offer: new FormControl(this.retailer.offer, [ Validators.required ]),
                    orderTypes: new FormControl(this.retailer.orderTypes),
                    otherOrderType: new FormControl(this.retailer.otherOrderType),
                    paymentTypes: new FormControl(this.retailer.paymentTypes),
                    otherPaymentType: new FormControl(this.retailer.otherPaymentType),
                    deliveryAreas: new FormControl(this.retailer.deliveryAreas),
                    otherDeliveryArea: new FormControl(this.retailer.otherDeliveryArea)
                });
                return;
        }
    }
}
