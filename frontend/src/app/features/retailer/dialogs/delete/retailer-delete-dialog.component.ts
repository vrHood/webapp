import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IRetailer } from '@vrhood/shared';

import { NotificationService } from '../../../../services/notification.service';
import { RetailerService } from '../../../../services/retailer.service';

export interface RetailerDeleteDialogData {
    retailer?: IRetailer;
}

@Component({
    selector: 'app-retailer-delete-dialog',
    templateUrl: './retailer-delete-dialog.component.html',
    styleUrls: [ './retailer-delete-dialog.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-retailer-delete-dialog'
    }
})
export class RetailerDeleteDialogComponent implements OnInit {

    static show(dialog: MatDialog, data: RetailerDeleteDialogData, viewContainerRef?: ViewContainerRef): MatDialogRef<RetailerDeleteDialogComponent> {
        return dialog.open<RetailerDeleteDialogComponent, RetailerDeleteDialogData>(
            RetailerDeleteDialogComponent,
            {
                data,
                viewContainerRef,
                minWidth: '700px',
                maxHeight: '1000px'
            }
        );
    }

    isSaving: boolean;
    retailer?: IRetailer;

    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) data: RetailerDeleteDialogData,
                private readonly _notificationService: NotificationService,
                private readonly _retailerService: RetailerService,
                private readonly _translateService: TranslateService,
                private readonly _dialogRef: MatDialogRef<RetailerDeleteDialogComponent>,
                private readonly _changeDetector: ChangeDetectorRef) {
        this.retailer = data.retailer;
    }

    ngOnInit() {

    }

    onCancel() {
        this._dialogRef.close();
    }

    onDelete() {
        this._retailerService.remove(this.retailer._id)
            .then((result) => this.onSuccess(result))
            .catch((error) => this.onError(error));
    }

    onSuccess(result: IRetailer) {
        this._notificationService.success(this._translateService.instant('FEATURES.RETAILER.DIALOGS.DELETE.FEEDBACK.SUCCESS'));
        this._dialogRef.close(result);
    }

    onError(error: any) {
        this._notificationService.error(this._translateService.instant('FEATURES.RETAILER.DIALOGS.DELETE.FEEDBACK.SUCCESS'));
    }

}
