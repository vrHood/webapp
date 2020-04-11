import { Directive } from '@angular/core';

@Directive({
    selector: '[appChipLeadingIcon]',
    host: {
        class: 'app-chip-leading-icon'
    }
})
export class ChipLeadingIconDirective {

    constructor() {
    }

}
