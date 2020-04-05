import { Forbidden } from '@feathersjs/errors';
import { Params, ServiceMethods } from '@feathersjs/feathers';
import { IRetailer, IRetailerSignupData, ServiceName, SignupData, SignupType, UserRole } from '@vrhood/shared';
import { pick as _pick } from 'lodash';

import { Application } from '../../declarations';

export interface SignupOptions {
    enabledTypes: SignupType[];
}

export class Signup implements Pick<ServiceMethods<SignupData>, 'create'> {
    app: Application;
    options: SignupOptions;

    constructor(options: SignupOptions = { enabledTypes: [] }, app: Application) {
        this.options = options;
        this.app = app;
    }

    async create(data: SignupData, params?: Params): Promise<SignupData> {
        const { type, user } = data;

        if (!type || !this.options.enabledTypes.includes(type)) {
            throw new Forbidden('Invalid signup type');
        }

        if (SignupType.RETAILER === type) {
            const createdRetailer: IRetailer = (await this.app.service(ServiceName.RETAILERS).create({
                ...(data as IRetailerSignupData).retailer,
                active: false
            })) as IRetailer;

            const createdUser = await this.app.service(ServiceName.USERS).create({
                ..._pick(user, 'firstName', 'lastName', 'email'),
                retailerId: createdRetailer._id,
                role: UserRole.RETAILER,
                active: false
            });
        }

        return {} as SignupData;
    }
}
