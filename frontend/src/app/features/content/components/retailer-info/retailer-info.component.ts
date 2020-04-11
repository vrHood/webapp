import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IRetailer } from '@vrhood/shared';

@Component({
    selector: 'app-retailer-info',
    templateUrl: './retailer-info.component.html',
    styleUrls: [ './retailer-info.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-retailer-info'
    }
})
export class RetailerInfoComponent implements OnInit {

    @Input()
    retailer: IRetailer;

    constructor() {
    }

    ngOnInit(): void {
    }

}
