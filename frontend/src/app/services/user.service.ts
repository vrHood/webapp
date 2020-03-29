import { Injectable } from '@angular/core';
import { IUser, ServiceName } from '@vrhood/shared';

import { DataServiceAdapter } from './data/data-service-adapter.class';
import { DataServiceFactory } from './data/data-service-factory.class';

@Injectable({
    providedIn: 'root'
})
export class UserService extends DataServiceAdapter<IUser> {

    constructor(factory: DataServiceFactory) {
        super(factory.create(ServiceName.USERS));
    }
}
