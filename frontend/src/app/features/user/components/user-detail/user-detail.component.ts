import { Component, OnInit } from '@angular/core';
import { IUser } from '@vrhood/shared';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: [ './user-detail.component.scss' ]
})
export class UserDetailComponent implements OnInit {

    user: IUser;

    constructor() {
    }

    ngOnInit(): void {
    }

}
