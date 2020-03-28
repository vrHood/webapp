import { Injectable } from '@angular/core';
import { ICategory, ServiceName } from '@vrhood/shared';

import { DataServiceAdapter } from './data/data-service-adapter.class';
import { DataServiceFactory } from './data/data-service-factory.class';

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends DataServiceAdapter<ICategory> {

    constructor(factory: DataServiceFactory) {
        super(factory.create(ServiceName.CATEGORIES));
    }
}
