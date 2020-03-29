import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IError } from '../../../../shared/error/models/error.model.i';
import { RetailerRegistrationView } from '../../models/retailer-registration-view.model.i';

@Component({
    selector: 'app-retailer-registration',
    templateUrl: './retailer-registration.page.html',
    styleUrls: ['./retailer-registration.page.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-retailer-registration'
    }
})
export class RetailerRegistrationPage implements OnInit {

    error: IError;

    private _view: RetailerRegistrationView = RetailerRegistrationView.FORM;

    constructor() {
    }

    get view(): RetailerRegistrationView {
        return this._view;
    }

    set view(view: RetailerRegistrationView) {

        if (view === this._view) {
            return;
        }

        this._view = view;
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

    onFormSubmit(retailer: any) {
        console.log('onFormSubmit', retailer);

        if (this.error) {
            this.error = null;
        }

        this.view = RetailerRegistrationView.LOADING;

        this._save();
    }

    onFormError(error: IError) {
        console.log('onFormError', error);
        this.error = error;
        this.view = RetailerRegistrationView.ERROR;
    }

    private _save() {
        // TODO: create retailer
        this.view = RetailerRegistrationView.SUCCESS;
    }

}
