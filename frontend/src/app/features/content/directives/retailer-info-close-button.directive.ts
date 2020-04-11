import { Directive } from '@angular/core';

@Directive({
    selector: '[appRetailerInfoCloseButton]',
    host: {
        class: 'app-retailer-info__close-button'
    }
})
export class RetailerInfoCloseButtonDirective {

    constructor() {
    }

}
