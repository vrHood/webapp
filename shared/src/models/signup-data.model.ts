import { IRetailer } from './retailer.model.i';
import { SignupType } from './signup-type.model';
import { IUser } from './user.model.i';

export interface IUserSignupData {
    type: SignupType.USER;
    user: Pick<IUser, 'firstName' | 'lastName' | 'email'>;
}

export interface IRetailerSignupData {
    type: SignupType.RETAILER;
    user: Partial<IUser>;
    retailer: Partial<IRetailer>;
}

export type SignupData = IUserSignupData | IRetailerSignupData;
