import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-category-detail-page',
    templateUrl: './category-detail.page.html',
    styleUrls: [ './category-detail.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-category-detail-page'
    }
})
export class CategoryDetailPage implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
