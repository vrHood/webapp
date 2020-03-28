import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@vrhood/shared';

import { UserService } from '../../../../services/user.service';

export enum UserEditMode {
    CREATE = 'create',
    EDIT = 'edit',
    DELETE = 'delete',
    CHANGE_PASSWORD = 'changePassword'
}

export interface UserEditDialogData {
    mode: UserEditMode;
    user?: IUser;
}

@Component({
    selector: 'app-user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrls: [ './user-edit-dialog.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-user-edit-dialog'
    }
})
export class UserEditDialogComponent implements OnInit {

    static show(dialog: MatDialog, data: UserEditDialogData, viewContainerRef?: ViewContainerRef): MatDialogRef<UserEditDialogComponent> {
        return dialog.open<UserEditDialogComponent, UserEditDialogData>(
            UserEditDialogComponent,
            {
                data,
                viewContainerRef,
                minWidth: '500px'
            }
        );
    }

    isSaving: boolean;
    mode: UserEditMode;
    user?: IUser;

    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) data: UserEditDialogData,
                private readonly _userService: UserService,
                private readonly _dialogRef: MatDialogRef<UserEditDialogComponent>,
                private readonly _changeDetector: ChangeDetectorRef) {
        this.mode = data.mode;
        this.user = data.user;
    }

    ngOnInit() {

        this._initForm();

    }

    onCancel() {
        this._dialogRef.close();
    }

    onDelete() {
        this._userService.remove(this.user._id)
            .then((result) => this.onSuccess(result))
            .catch((error) => this.onError(error));
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }

        this.isSaving = true;
        this.form.disable();
        this._changeDetector.detectChanges();

        switch (this.mode) {
            case UserEditMode.CREATE:
                this._userService.create(this.form.value)
                    .then((result) => this.onSuccess(result))
                    .catch((error) => this.onError(error));
                break;
            case UserEditMode.EDIT:
                this._userService.patch(this.user._id, this.form.value)
                    .then((result) => this.onSuccess(result))
                    .catch((error) => this.onError(error));
                break;
        }
    }

    onSuccess(result: IUser) {
        console.log('UserEditDialogComponent onSuccess', result, this);
        this._dialogRef.close({ result });
    }

    onError(error: any) {
        console.error('UserEditDialogComponent onError', error, this);
        this._dialogRef.close({ error });
    }

    private _initForm() {
        switch (this.mode) {
            case UserEditMode.CREATE:
                this.form = new FormGroup({
                    firstName: new FormControl(),
                    lastName: new FormControl(),
                    email: new FormControl(null, [ Validators.required, Validators.email ]),
                    password: new FormControl(null, [ Validators.required ]),
                    confirmPassword: new FormControl(null, [ Validators.required ]),
                    role: new FormControl(null, [ Validators.required ])
                });
                return;
            case UserEditMode.EDIT:
                this.form = new FormGroup({
                    firstName: new FormControl(),
                    lastName: new FormControl(),
                    email: new FormControl(this.user.email, [ Validators.required, Validators.email ]),
                    role: new FormControl(this.user.role, [ Validators.required ])
                });
                return;
            case UserEditMode.CHANGE_PASSWORD:
                this.form = new FormGroup({
                    currentPassword: new FormControl(null, [ Validators.required ]),
                    password: new FormControl(null, [ Validators.required ]),
                    confirmPassword: new FormControl(null, [ Validators.required ])
                });
                return;
        }
    }
}
