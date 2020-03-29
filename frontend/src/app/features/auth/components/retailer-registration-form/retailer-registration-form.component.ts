import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';
import { IError } from '../../../../shared/error/models/error.model.i';
import { IRetailerRegistrationFormStep } from '../../models/retailer-registration-form-step.model.i';
import { RetailerRegistrationFormErrorStateMatcher } from './retailer-registration-form-error-step-matcher';

@Component({
    selector: 'app-retailer-registration-form',
    templateUrl: './retailer-registration-form.component.html',
    styleUrls: ['./retailer-registration-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-retailer-registration-form'
    }
})
export class RetailerRegistrationFormComponent implements OnInit {

    @Output()
    result: Subject<any> = new Subject<any>();

    @Output()
    error: Subject<IError> = new Subject<IError>();

    form: FormGroup;
    branches: string[] = [
        'Nahrungs- und Genussmittel',
        'Gesundheit und Körperpflege',
        'Blumen, Pflanzen und zoologischer Bedarf',
        'Bücher, Papierwaren, Bürobedarf, Schreib- und Spielwaren',
        'Bekleidung, Schuhe, Sport',
        'Hausrat, Einrichtung und Möbel',
        'Handwerk, Kunst, Design',
        'Sonstiger Einzelhandel'
    ];
    contactOptions: string[] = [
        'telefonisch',
        'per Mail',
        'über meinen Webshop',
        'persönliche Nachricht auf Social Media'
    ];
    paymentOptions: string[] = [
        'auf Rechnung',
        'Vorkasse/Überweisung',
        'PayPal',
        'Sofortüberweisung',
        'Kreditkarte',
        'googlePay',
        'ApplePay',
        'Sonstiges'
    ];
    deliveryOptions: string[] = [
        'Stadtgebiet',
        'Landkreis',
        'Bundesweit'
    ];

    errorStateMatcher: ErrorStateMatcher = new RetailerRegistrationFormErrorStateMatcher();
    selectedStepIndex: number = 0;

    private _steps: IRetailerRegistrationFormStep[] = [];

    constructor() {
    }

    get hasNextStep(): boolean {
        return this.selectedStepIndex < (this._steps.length - 1);
    }

    get hasPreviousStep(): boolean {
        return this.selectedStepIndex > 0;
    }

    get isCurrentStepValid(): boolean {
        return this._isStepValid(this.selectedStepIndex);
    }

    get stepCount(): number {
        return this._steps.length;
    }

    get currentStepNumber(): number {
        return this.selectedStepIndex + 1;
    }

    get progress(): number {
        return (this.currentStepNumber / this.stepCount) * 100;
    }

    ngOnInit(): void {
        this._initForm();
    }

    getFormControl(...path: string[]): FormControl {
        const control = this.form.get(path);
        return control && control instanceof FormControl ? control : null;
    }

    isErrorState(control: FormControl): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    showNextStep() {

        const currentStep = this._getCurrentStep();

        if (!currentStep) {
            return;
        }

        if (currentStep.form) {

            currentStep.form.markAllAsTouched();

            if (!currentStep.form.valid) {
                return;
            }
        }

        if (this.hasNextStep) {
            this.selectedStepIndex++;
        }
    }

    showPreviousStep() {
        if (this.hasPreviousStep) {
            this.selectedStepIndex--;
        }
    }

    submit() {

        this.form.markAllAsTouched();

        if (this.form.invalid) {
            this._showError({
                title: 'Fehler',
                message: 'Das Formular enthält Fehler. Bitte prüfen Sie Ihre Angaben und versuchen es erneut.'
            });
            return;
        }

        this._hideError();

        const retailer = this._getRetailerFromForm();

        this.result.next(retailer);
    }

    private _getCurrentStep(): IRetailerRegistrationFormStep {
        return this._steps[this.selectedStepIndex];
    }

    private _isStepValid(index: number): boolean {
        const step = this._steps[index];
        return step && step.form ? step.form.valid : false;
    }

    private _initForm() {

        const account = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            dataUsageAccepted: new FormControl(null, Validators.requiredTrue)
        });
        this._steps.push({ form: account });

        const basic = new FormGroup({
            name: new FormControl(null, Validators.required),
            branches: new FormControl(null, Validators.required),
            address: new FormGroup({
                street: new FormControl(null, Validators.required),
                houseNumber: new FormControl(null, Validators.required),
                zip: new FormControl(null, Validators.required),
                city: new FormControl(null, Validators.required)
            })
        });
        this._steps.push({ form: basic });

        const contact = new FormGroup({
            email: new FormControl(null, Validators.email),
            phone: new FormControl(),
            mobilePhone: new FormControl(),
            whatsapp: new FormControl(),
            website: new FormControl(),
            facebook: new FormControl(),
            instagram: new FormControl()
        });
        this._steps.push({ form: contact });

        const products = new FormGroup({
            businessDescription: new FormControl(),
            productsDescription: new FormControl()
        });
        this._steps.push({ form: products });

        const order = new FormGroup({
            contactOptions: new FormControl(),
            paymentOptions: new FormControl(),
            deliveryOptions: new FormControl()
        });
        this._steps.push({ form: order });

        this.form = new FormGroup({
            account,
            basic,
            contact,
            products,
            order
        });

    }

    private _showError(error: IError) {
        this.error.next(error);
    }

    private _hideError() {
        this.error.next();
    }

    private _getRetailerFromForm() {

        const formData = this.form.value;

        const retailer = {
            ...formData.account,
            ...formData.basic,
            contact: formData.contact,
            ...formData.products,
            ...formData.order
        };

        return retailer;
    }

}
