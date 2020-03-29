import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UserRole } from '../../../../../../../shared/lib/models/user-role.model';
import { AuthService } from '../../../../services/auth/authentication-service.class';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
    styleUrls: [ './login.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-login-page'
    }
})
export class LoginPage implements OnInit, OnDestroy {

    readonly form: FormGroup = new FormGroup({
        email: new FormControl(null, [ Validators.required, Validators.email ]),
        password: new FormControl(null, [ Validators.required ])
    });

    private readonly _onDestroy = new Subject();

    constructor(private readonly _router: Router, private readonly _authService: AuthService) {

    }

    async ngOnInit() {
        await this._authService.silentLogin();

        this._authService.onLogin$.pipe(
            switchMap(() => this._authService.getActiveUser()),
            takeUntil(this._onDestroy)
        ).subscribe((activeUser) => {
            this._router.navigateByUrl(UserRole.ADMIN === activeUser.role ? '/admin/users' : '/')
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    async onSubmit() {
        if (!this.form.valid) {
            return;
        }

        const formData = this.form.value;

        await this._authService.login(formData.email, formData.password);
    }

}
