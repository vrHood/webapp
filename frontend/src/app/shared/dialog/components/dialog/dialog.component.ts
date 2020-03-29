import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-dialog'
    }
})
export class DialogComponent implements OnInit, OnDestroy {

    @Output()
    isSavingChange = new Subject();

    private _isSaving: boolean = false;

    constructor() {

    }

    @Input()
    set isSaving(value: boolean) {
        this._isSaving = coerceBooleanProperty(value);
        this.isSavingChange.next(value);
    }

    get isSaving(): boolean {
        return this._isSaving;
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.isSavingChange.complete();
    }
}
