import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';
import { IError } from '../../../../shared/error/models/error.model.i';
import {
    IRetailerRegistrationFormStep,
    IRetailerRegistrationStep, IRetailerRegistrationConfirmationStep,
    RetailerRegistrationStepType
} from '../../models/retailer-registration-step.model.i';
import { RetailerRegistrationFormErrorStateMatcher } from './retailer-registration-form-error-step-matcher';
import { each as _each, find as _find, findIndex as _findIndex } from 'lodash';

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
    currentStepIndex: number;
    allFormStepsSeen: boolean = false;

    private _steps: IRetailerRegistrationStep[] = [];
    private _formStepCount: number = 0;

    constructor() {
    }

    get hasNextStep(): boolean {
        return this.currentStepIndex < (this._steps.length - 1);
    }

    get hasPreviousStep(): boolean {
        return this.currentStepIndex > 0;
    }

    get isCurrentStepValid(): boolean {
        return this._isStepValid(this.currentStepIndex);
    }

    get formStepCount(): number {
        return this._formStepCount;
    }

    get currentStepNumber(): number {
        return this.currentStepIndex + 1;
    }

    get isFormStep(): boolean {
        const currentStep = this._getCurrentStep();
        return RetailerRegistrationStepType.FORM === currentStep.type;
    }

    get isConfirmationStep(): boolean {
        const currentStep = this._getCurrentStep();
        return RetailerRegistrationStepType.CONFIRMATION === currentStep.type;
    }

    get nextStepIsConfirmation(): boolean {
        const nextStep = this._steps[this.currentStepIndex + 1];
        return nextStep && RetailerRegistrationStepType.CONFIRMATION === nextStep.type;
    }

    get isFormValid(): boolean {
        return this.form && this.form.valid;
    }

    get isConfirmationStepEnabled(): boolean {
        return (this.isFormValid && this.allFormStepsSeen) || this.nextStepIsConfirmation;
    }

    ngOnInit(): void {
        this._initForm();
        this._initSteps();
        this.showStep(0);
    }

    getFormStep(key: string): IRetailerRegistrationFormStep {
        return _find(this._steps, { type: RetailerRegistrationStepType.FORM, key });
    }

    getFormStepIndex(key: string): number {
        return _findIndex(this._steps, { type: RetailerRegistrationStepType.FORM, key });
    }

    getConfirmationStep(): IRetailerRegistrationConfirmationStep {
        return _find(this._steps, { type: RetailerRegistrationStepType.CONFIRMATION });
    }

    getConfirmationStepIndex(): number {
        return _findIndex(this._steps, { type: RetailerRegistrationStepType.CONFIRMATION });
    }

    getFormControl(...path: string[]): FormControl {
        const control = this.form.get(path);
        return control && control instanceof FormControl ? control : null;
    }

    getFormGroup(...path: string[]): FormGroup {
        const group = this.form.get(path);
        return group && group instanceof FormGroup ? group : null;
    }

    isErrorState(control: FormControl): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    showPreviousStep() {
        if (this.hasPreviousStep) {
            this.showStep(this.currentStepIndex - 1);
        }
    }

    showNextStep() {

        if (!this._isStepValid(this.currentStepIndex, true)) {
            return;
        }

        if (this.hasNextStep) {
            this.showStep(this.currentStepIndex + 1);
        }
    }

    showFormStep(key: string) {
        this.showStep(this.getFormStepIndex(key));
    }

    showConfirmationStep() {

        if (!this.isFormValid) {
            return;
        }

        this.showStep(this.getConfirmationStepIndex());
    }

    showStep(index: number) {

        if (index < 0 || index >= this._steps.length) {
            return;
        }

        this.currentStepIndex = index;
        this._steps[index].seen = true;

        let allFormStepsSeen: boolean = true;

        _each(this._steps, step => {
            if (RetailerRegistrationStepType.FORM === step.type && !step.seen) {
                allFormStepsSeen = false;
                return false;
            }
        });

        this.allFormStepsSeen = allFormStepsSeen;
    }

    submit() {

        this.form.markAllAsTouched();

        if (!this.isFormValid) {
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

    private _getCurrentStep(): IRetailerRegistrationStep {
        return this._steps[this.currentStepIndex];
    }

    private _isStepValid(index: number, validate?: boolean): boolean {
        const step = this._steps[index];

        if (!step || RetailerRegistrationStepType.FORM !== step.type || !this.form) {
            return false
        }

        const formGroup = this.form.get(step.key);

        if (validate) {
            formGroup.markAllAsTouched();
        }

        return formGroup && formGroup instanceof FormGroup ? formGroup.valid : false;
    }

    private _initForm() {

        const account = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            dataUsageAccepted: new FormControl(null, Validators.requiredTrue)
        });

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

        const contact = new FormGroup({
            email: new FormControl(null, Validators.email),
            phone: new FormControl(),
            mobilePhone: new FormControl(),
            whatsapp: new FormControl(),
            website: new FormControl(),
            facebook: new FormControl(),
            instagram: new FormControl()
        });

        const products = new FormGroup({
            businessDescription: new FormControl(),
            productsDescription: new FormControl()
        });

        const order = new FormGroup({
            contactOptions: new FormControl(),
            paymentOptions: new FormControl(),
            deliveryOptions: new FormControl()
        });

        this.form = new FormGroup({
            account,
            basic,
            contact,
            products,
            order
        });

    }

    private _initSteps() {

        this._addFormStep('account', 'Account-Informationen');
        this._addFormStep('basic', 'Grundlegende Angaben zu Ihrem Einzelhandel');
        this._addFormStep('contact', 'Kontaktmöglichkeiten für Ihre Kunden');
        this._addFormStep('products', 'Welche Produkte bieten Sie an?');
        this._addFormStep('order', 'Wie bestelle ich bei Ihnen?');

        this._steps.push({ type: RetailerRegistrationStepType.CONFIRMATION });

    }

    private _addFormStep(key: string, label: string) {

        if (!this.form) {
            return;
        }

        const formGroup = this.form.get(key);

        if (!formGroup || !(formGroup instanceof FormGroup)) {
            return;
        }

        this._steps.push({
            type: RetailerRegistrationStepType.FORM,
            key,
            label
        });

        this._formStepCount++;
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
