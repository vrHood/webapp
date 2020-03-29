import { Directive } from '@angular/core';

@Directive({
    selector: '[appPageLayoutHeaderAction]',
    host: {
        class: 'app-page-layout-header__action'
    }
})
export class PageLayoutHeaderActionDirective {

    constructor() {
    }

}
