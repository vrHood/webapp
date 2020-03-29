import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogComponent } from '../components/dialog/dialog.component';

@Directive({
    selector: '[appDialogAction]',
    host: {
        class: 'app-dialog__action'
    }
})
export class DialogActionDirective implements OnDestroy {

    private readonly _onDestroy = new Subject();

    constructor(elementRef: ElementRef, dialog: DialogComponent) {
        const nativeElement: HTMLElement = elementRef.nativeElement;

        dialog.isSavingChange.pipe(
            takeUntil(this._onDestroy)
        ).subscribe((isSaving) => {
            if (isSaving) {
                nativeElement.setAttribute('disabled', 'true');
            } else {
                nativeElement.removeAttribute('disabled');
            }
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

}
