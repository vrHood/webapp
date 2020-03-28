import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-page-layout-header',
    templateUrl: './page-layout-header.component.html',
    styleUrls: [ './page-layout-header.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-page-layout-header'
    }
})
export class PageLayoutHeaderComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
