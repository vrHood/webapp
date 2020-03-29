import { Directive } from '@angular/core';

@Directive({
    selector: '[appDialogActions]',
    host: {
        class: 'app-dialog__actions'
    }
})
export class DialogActionsDirective {

    constructor() {
    }

}
