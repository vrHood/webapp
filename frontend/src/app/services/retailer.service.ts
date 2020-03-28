import { Injectable } from '@angular/core';
import { IRetailer, ServiceName } from '@vrhood/shared';

import { DataServiceAdapter } from './data/data-service-adapter.class';
import { DataServiceFactory } from './data/data-service-factory.class';

@Injectable({
    providedIn: 'root'
})
export class RetailerService extends DataServiceAdapter<IRetailer> {

    constructor(factory: DataServiceFactory) {
        super(factory.create(ServiceName.RETAILERS));
    }
}
