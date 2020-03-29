import { Directive } from '@angular/core';

@Directive({
    selector: '[appPageLayoutHeaderTitle]',
    host: {
        class: 'app-page-layout-header__title'
    }
})
export class PageLayoutHeaderTitleDirective {

    constructor() {
    }

}
