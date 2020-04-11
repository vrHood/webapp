import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '@vrhood/shared';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Icon } from '../../../../models/icon.model';

import { CategoryService } from '../../../../services/category.service';
import { IconUtils } from '../../../../utils/icon.utils';
import { MATERIAL_ICON_NAMES } from '../../data/icon-names';

export enum CategoryEditMode {
    CREATE = 'create',
    EDIT = 'edit',
    DELETE = 'delete'
}

export interface CategoryEditDialogData {
    mode: CategoryEditMode;
    category?: ICategory;
}

@Component({
    selector: 'app-category-edit-dialog',
    templateUrl: './category-edit-dialog.component.html',
    styleUrls: [ './category-edit-dialog.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-category-edit-dialog'
    }
})
export class CategoryEditDialogComponent implements OnInit {

    static show(dialog: MatDialog, data: CategoryEditDialogData, viewContainerRef?: ViewContainerRef): MatDialogRef<CategoryEditDialogComponent> {
        return dialog.open<CategoryEditDialogComponent, CategoryEditDialogData>(
            CategoryEditDialogComponent,
            {
                data,
                viewContainerRef,
                minWidth: '500px'
            }
        );
    }

    readonly allIcons = IconUtils.ALL_ICONS;
    filteredIcons$: Observable<Icon[]>;

    isSaving: boolean;
    mode: CategoryEditMode;
    category?: ICategory;

    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) data: CategoryEditDialogData,
                private readonly _categoryService: CategoryService,
                private readonly _dialogRef: MatDialogRef<CategoryEditDialogComponent>,
                private readonly _changeDetector: ChangeDetectorRef) {
        this.mode = data.mode;
        this.category = data.category;
    }

    ngOnInit() {

        this._initForm();

    }

    onCancel() {
        this._dialogRef.close();
    }

    onDelete() {
        this._categoryService.remove(this.category._id)
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
            case CategoryEditMode.CREATE:
                this._categoryService.create(this.form.value)
                    .then((result) => this.onSuccess(result))
                    .catch((error) => this.onError(error));
                break;
            case CategoryEditMode.EDIT:
                this._categoryService.patch(this.category._id, this.form.value)
                    .then((result) => this.onSuccess(result))
                    .catch((error) => this.onError(error));
                break;
        }
    }

    onSuccess(result: ICategory) {
        console.log('CategoryEditDialogComponent onSuccess', result, this);
        this._dialogRef.close({ result });
    }

    onError(error: any) {
        console.error('CategoryEditDialogComponent onError', error, this);
        this._dialogRef.close({ error });
    }

    private _initForm() {
        console.log('CategoryEditDialogComponent _initForm');
        switch (this.mode) {
            case CategoryEditMode.CREATE:
                this.form = new FormGroup({
                    icon: new FormControl(null, [ Validators.required ]),
                    name: new FormControl(null, [ Validators.required ]),
                    color: new FormControl(null, [ Validators.required ])
                });
                break;
            case CategoryEditMode.EDIT:
                this.form = new FormGroup({
                    icon: new FormControl(this.category.icon, [ Validators.required ]),
                    name: new FormControl(this.category.name, [ Validators.required ]),
                    color: new FormControl(this.category.color, [ Validators.required ])
                });
                break;
        }

        if (this.form != null) {
            const iconFormControl = this.form.get('icon');

            this.filteredIcons$ = iconFormControl.valueChanges
                .pipe(
                    startWith<string>(iconFormControl.value as string),
                    map(value => this._filterIcons(value))
                );
        }
    }

    private _filterIcons(value: string): Icon[] {
        if (!value) {
            return this.allIcons;
        }

        const filterValue = value.toLowerCase();

        return this.allIcons.filter(option => option.toLowerCase().includes(filterValue));
    }
}
