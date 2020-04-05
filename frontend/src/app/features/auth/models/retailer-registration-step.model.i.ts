import { FormGroup } from '@angular/forms';

export enum RetailerRegistrationStepType {
    FORM = 'form',
    CONFIRMATION = 'confirmation'
}

export interface IBaseRetailerRegistrationStep {
    type: RetailerRegistrationStepType;
    seen?: boolean;
}

export interface IRetailerRegistrationFormStep extends IBaseRetailerRegistrationStep {
    type: RetailerRegistrationStepType.FORM;
    key: string;
    label: string;
}

export interface IRetailerRegistrationConfirmationStep extends IBaseRetailerRegistrationStep {
    type: RetailerRegistrationStepType.CONFIRMATION;
}


export type IRetailerRegistrationStep = IRetailerRegistrationFormStep | IRetailerRegistrationConfirmationStep;
