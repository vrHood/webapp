import { Directive } from '@angular/core';

@Directive({
    selector: '[appDialogTitle]',
    host: {
        class: 'app-dialog__title'
    }
})
export class DialogTitleDirective {

    constructor() {
    }

}
