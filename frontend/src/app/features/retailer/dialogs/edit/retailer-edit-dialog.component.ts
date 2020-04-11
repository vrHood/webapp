import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TinyColor } from '@ctrl/tinycolor';
import { Paginated } from '@feathersjs/feathers';
import {
    DELIVERY_AREA_SELECT_VALUES,
    DELIVERY_AREA_TRANSLATE_VALUES,
    DeliveryArea, ICategory, IPopulatedRetailer,
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
import { includes as _includes, pull as _pull, get as _get } from 'lodash';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { CategoryService } from '../../../../services/category.service';
import { RetailerService } from '../../../../services/retailer.service';
import { DefaultErrorStateMatcher } from '../../../../utils/default-error-step-matcher';

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

    readonly categories$: Observable<ICategory[]>;

    readonly errorStateMatcher: ErrorStateMatcher = new DefaultErrorStateMatcher();

    isSaving: boolean;
    mode: RetailerEditMode;
    retailer?: IPopulatedRetailer;

    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) data: RetailerEditDialogData,
                readonly changeDetector: ChangeDetectorRef,
                private readonly _retailerService: RetailerService,
                private readonly _categoryService: CategoryService,
                private readonly _dialogRef: MatDialogRef<RetailerEditDialogComponent>) {
        this.mode = data.mode;
        this.retailer = data.retailer;

        this.categories$ = _categoryService.find()
            .pipe(
                // @ts-ignore
                map((result: ICategory[] | Paginated<ICategory>) => {
                    return Array.isArray(result) ? result : result.data;
                })
            );
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

        this._retailerService.get(this.retailer._id)
            .pipe(first())
            .subscribe((retailer: IPopulatedRetailer) => {
                this.retailer = retailer;
                this.form.get('mainCategory').setValue(retailer.mainCategory);
                this.form.get('additionalCategories').setValue(retailer.additionalCategories);
                this.changeDetector.detectChanges();
            });

        this._initForm();
        console.log('RetailerEditDialogComponent retailer', this.retailer);
        console.log('RetailerEditDialogComponent form', this.form);
        this.changeDetector.detectChanges();
    }

    compareCategories(o1: ICategory, o2: ICategory): boolean {
        return o1 != null && o2 != null && o1._id === o2._id;
    }
    getContrastColor(color: string) {
        return (!color || new TinyColor(color).isLight()) ? 'rgba(0, 0, 0, 0.87)' : 'white';
    }

    getFormControl(...path: string[]): FormControl {
        const control = this.form.get(path);
        return control && control instanceof FormControl ? control : null;
    }

    getFormGroup(...path: string[]): FormGroup {
        const group = this.form.get(path);
        return group && group instanceof FormGroup ? group : null;
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
            ...formData,
            mainCategoryId: formData.mainCategory ? formData.mainCategory._id : null,
            additionalCategoryIds: formData.additionalCategories ? formData.additionalCategories.map((category) => category._id) : null,
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
                    mainCategory: new FormControl(null, [ Validators.required ]),
                    additionalCategories: new FormControl(),
                    location: new FormGroup({
                        street: new FormControl(null, [ Validators.required ]),
                        houseNumber: new FormControl(null, [ Validators.required ]),
                        zip: new FormControl(null, [ Validators.required ]),
                        city: new FormControl(null, [ Validators.required ]),
                        latitude: new FormControl(null, [ Validators.required ]),
                        longitude: new FormControl(null, [ Validators.required ]),
                    }),
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
                const mainCategory = this.retailer.mainCategory ? this.retailer.mainCategory : { _id: this.retailer.mainCategoryId };
                const additionalCategories = this.retailer.additionalCategories ? this.retailer.additionalCategories : this.retailer.additionalCategoryIds.map((id) => ({ _id: id }));

                this.form = new FormGroup({
                    name: new FormControl(this.retailer.name, [ Validators.required ]),
                    mainCategory: new FormControl(mainCategory, [ Validators.required ]),
                    additionalCategories: new FormControl(additionalCategories),
                    location: new FormGroup({
                        street: new FormControl(_get(this.retailer, 'location.street'), [ Validators.required ]),
                        houseNumber: new FormControl(_get(this.retailer, 'location.houseNumber'), [ Validators.required ]),
                        zip: new FormControl(_get(this.retailer, 'location.zip'), [ Validators.required ]),
                        city: new FormControl(_get(this.retailer, 'location.city'), [ Validators.required ]),
                        latitude: new FormControl(_get(this.retailer, 'location.latitude'), [ Validators.required ]),
                        longitude: new FormControl(_get(this.retailer, 'location.longitude'), [ Validators.required ]),
                    }),
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
