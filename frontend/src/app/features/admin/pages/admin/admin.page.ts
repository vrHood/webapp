import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@vrhood/shared';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { AuthService } from '../../../../services/auth/authentication-service.class';
import { IMenuItem } from '../../../../models/menu-item.model.i';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin.page.html',
    styleUrls: [ './admin.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-admin-page'
    }
})
export class AdminPage implements OnInit {

    menuItems: IMenuItem[] = [
        {
            icon: 'group',
            label: 'Nutzer',
            route: '/admin/users'
        },
        {
            icon: 'business',
            label: 'Händler',
            route: '/admin/retailers'
        },
        {
            icon: 'category',
            label: 'Kategorien',
            route: '/admin/categories'
        }
    ];

    readonly isAuthenticated$: Observable<boolean>;
    readonly activeUser$: Observable<IUser>;
    readonly isSmallScreen$: Observable<boolean>;
    readonly sidenavOpened$: Observable<boolean>;
    readonly sidenavMode$: Observable<string>;

    constructor(breakpointObserver: BreakpointObserver, activatedRoute: ActivatedRoute, private readonly _router: Router, private readonly _authService: AuthService) {
        this.isAuthenticated$ = _authService.isAuthenticated$;
        this.activeUser$ = _authService.activeUser$;
        this.isSmallScreen$ = breakpointObserver.observe('(max-width: 1200px)').pipe(pluck('matches'));
        this.sidenavOpened$ = this.isSmallScreen$.pipe(map((value) => !value));
        this.sidenavMode$ = this.isSmallScreen$.pipe(map((value) => value ? 'over' : 'side'));
    }

    ngOnInit(): void {
    }

    logout() {
        this._authService.logout().then(() => this._router.navigateByUrl('/admin/auth/login'));
    }
}
