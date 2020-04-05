import { Injectable } from '@angular/core';
import { ServiceName, SignupData } from '@vrhood/shared';

import { DataServiceAdapter } from './data/data-service-adapter.class';
import { DataServiceFactory } from './data/data-service-factory.class';

@Injectable({
    providedIn: 'root'
})
export class SignupService extends DataServiceAdapter<SignupData> {

    constructor(factory: DataServiceFactory) {
        super(factory.create(ServiceName.SIGNUP));
    }
}
