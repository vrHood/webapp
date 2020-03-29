import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IUser } from '@vrhood/shared';

@Component({
    selector: 'app-user-detail-page',
    templateUrl: './user-detail.page.html',
    styleUrls: [ './user-detail.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-user-detail-page'
    }
})
export class UserDetailPage implements OnInit {

    user: IUser;

    constructor() {
    }

    ngOnInit(): void {
    }

}
