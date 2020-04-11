import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRetailer, IUser } from '@vrhood/shared';
import { merge, Observable, of, Subject } from 'rxjs';
import { pluck, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../../../services/auth/authentication-service.class';
import { RetailerService } from '../../../../services/retailer.service';

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

    activeRetailer$: Observable<IRetailer>;
    selectedCategories: string[];
    private readonly _activeRetailerIdSubject = new Subject();

    constructor(retailerService: RetailerService,
                private readonly _authService: AuthService,
                private readonly _activatedRoute: ActivatedRoute,
                private readonly _changeDetector: ChangeDetectorRef,
                private readonly _router: Router) {
        _authService.silentLogin();
        this.activeUser$ = _authService.activeUser$;

        this.activeRetailer$ = merge(
            this._activeRetailerIdSubject,
            _activatedRoute.queryParams.pipe(pluck('retailer'))
        ).pipe(
            tap((retailer) => console.log('ContentPage retailerId', retailer)),
            switchMap((retailerId) => {
                if (!retailerId) {
                    return of(null);
                }

                return retailerService.get(retailerId);
            }),
            tap((retailer) => console.log('ContentPage retailer', retailer))
        );
    }

    @Input()
    set activeRetailer(value: IRetailer) {
        this._activeRetailerIdSubject.next(value._id);
    }

    ngOnInit(): void {
    }

    logout() {
        this._authService.logout();
    }

    showRetailerInfo(retailer: IRetailer) {
        if (!retailer) {
            return;
        }

        this._activeRetailerIdSubject.next(retailer ? retailer._id : null);
        this._router.navigate([], {
            queryParams: {
                retailer: retailer._id
            }
        });
    }

    hideRetailerInfo() {
        this._activeRetailerIdSubject.next(null);
        this._router.navigate([], {
            queryParams: {}
        });
    }

    onSelectedCategoriesChanged(selectedCategories: string[]) {
        console.log('ContentPage onSelectedCategoriesChanged', selectedCategories);
        this.selectedCategories = selectedCategories;
        this._changeDetector.detectChanges();
    }

}
