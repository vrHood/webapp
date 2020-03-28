import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/authentication-service.class';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: [ './login.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-login'
    }
})
export class LoginPage implements OnInit {

    readonly form: FormGroup = new FormGroup({
        email: new FormControl(null, [ Validators.required, Validators.email ]),
        password: new FormControl(null, [ Validators.required ])
    });

    constructor(private readonly _authService: AuthService) {
    }

    ngOnInit(): void {
        this._authService.silentLogin();
    }

    async onSubmit() {
        if (!this.form.valid) {
            return;
        }

        const formData = this.form.value;

        await this._authService.login(formData.email, formData.password);
    }

}
