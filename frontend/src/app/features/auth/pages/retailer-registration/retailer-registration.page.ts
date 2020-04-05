import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core'
import { SignupData } from '@vrhood/shared';

import { SignupService } from '../../../../services/signup.service';
import { IError } from '../../../../shared/error/models/error.model.i';
import { RetailerRegistrationView } from '../../models/retailer-registration-view.model.i';

@Component({
    selector: 'app-retailer-registration',
    templateUrl: './retailer-registration.page.html',
    styleUrls: [ './retailer-registration.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-retailer-registration'
    }
})
export class RetailerRegistrationPage implements OnInit {

    error: IError;

    private _view: RetailerRegistrationView = RetailerRegistrationView.FORM;

    constructor(private readonly _signupService: SignupService, private readonly _changeDetector: ChangeDetectorRef) {
    }

    get view(): RetailerRegistrationView {
        return this._view;
    }

    set view(view: RetailerRegistrationView) {
        if (view === this._view) {
            return;
        }

        this._view = view;
        this._changeDetector.detectChanges();
    }

    get isFormView(): boolean {
        return RetailerRegistrationView.FORM === this._view;
    }

    get isLoadingView(): boolean {
        return RetailerRegistrationView.LOADING === this._view;
    }

    get isErrorView(): boolean {
        return RetailerRegistrationView.ERROR === this._view;
    }

    get isSuccessView(): boolean {
        return RetailerRegistrationView.SUCCESS === this._view;
    }

    ngOnInit(): void {
    }

    showFormView() {
        this.view = RetailerRegistrationView.FORM;
    }

    onFormSubmit(signupData: SignupData) {
        console.log('onFormSubmit', signupData);

        if (this.error) {
            this.error = null;
        }

        this.view = RetailerRegistrationView.LOADING;

        this._save(signupData);
    }

    onFormError(error: IError) {
        console.log('onFormError', error);
        this.error = error;
        this.view = RetailerRegistrationView.ERROR;
    }

    private _save(signupData: SignupData) {
        // TODO: create retailer

        this._signupService.create(signupData)
            .then(() => this._onSuccess())
            .catch((error) => this._onError(error));
    }

    private _onSuccess() {
        this.view = RetailerRegistrationView.SUCCESS;
    }

    private _onError(error: any) {
        this.view = RetailerRegistrationView.ERROR;
    }

}
