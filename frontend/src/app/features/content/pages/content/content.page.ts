import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-content-page',
    templateUrl: './content.page.html',
    styleUrls: [ './content.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-content-page'
    }
})
export class ContentPage implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
