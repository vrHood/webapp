import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IUser } from '@vrhood/shared';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../services/auth/authentication-service.class';

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

    readonly activeUser$: Observable<IUser>;

    constructor(private readonly _authService: AuthService) {
        _authService.silentLogin();
        this.activeUser$ = _authService.activeUser$;
    }

    ngOnInit(): void {
    }

    logout() {
        this._authService.logout();
    }

}
