import { Directive } from '@angular/core';

@Directive({
    selector: '[appPageLayoutHeaderSubtitle]',
    host: {
        class: 'app-page-layout-header__subtitle'
    }
})
export class PageLayoutHeaderSubtitleDirective {

    constructor() {
    }

}
