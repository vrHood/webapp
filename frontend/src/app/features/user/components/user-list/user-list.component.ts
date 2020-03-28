import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '@vrhood/shared';

import { UserService } from '../../../../services/user.service';
import { UserEditDialogComponent, UserEditMode } from '../../dialogs/user-create/user-edit-dialog.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: [ './user-list.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-user-list'
    }
})
export class UserListComponent implements OnInit {

    displayedColumns = [ 'firstName', 'lastName', 'email', 'role', 'actions' ];

    constructor(readonly userService: UserService,
                private readonly _matDialog: MatDialog,
                private readonly _viewContainerRef: ViewContainerRef) {

    }

    ngOnInit(): void {
    }

    changePassword(user: IUser) {
        UserEditDialogComponent.show(this._matDialog, { mode: UserEditMode.CHANGE_PASSWORD, user }, this._viewContainerRef);
    }

    edit(user: IUser) {
        UserEditDialogComponent.show(this._matDialog, { mode: UserEditMode.EDIT, user }, this._viewContainerRef);
    }

    delete(user: IUser) {
        UserEditDialogComponent.show(this._matDialog, { mode: UserEditMode.DELETE, user }, this._viewContainerRef);
    }

    addUser() {
        UserEditDialogComponent.show(this._matDialog, { mode: UserEditMode.CREATE }, this._viewContainerRef);
    }
}
