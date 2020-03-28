import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-page-layout',
    templateUrl: './page-layout.component.html',
    styleUrls: [ './page-layout.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-page-layout'
    }
})
export class PageLayoutComponent implements OnInit {

    @Input()
    parent: any;

    constructor() {
    }

    ngOnInit(): void {
    }

}
