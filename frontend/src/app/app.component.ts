import { ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth/authentication-service.class';
import { NotificationService } from './services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-root'
    }
})
export class AppComponent implements OnDestroy {
    title = 'frontend';

    private readonly _onDestroy = new Subject();

    constructor(authService: AuthService, notificationService: NotificationService) {

        authService.onLogin$.pipe(
            takeUntil(this._onDestroy)
        ).subscribe(() => {
            notificationService.success('Sie wurden erfolgreich angemeldet!');
        });

        authService.onLogout$.pipe(
            takeUntil(this._onDestroy)
        ).subscribe(() => {
            notificationService.error('Sie wurden erfolgreich abgemeldet!');
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
