import { Inject, Injectable } from '@angular/core';
import { Application } from '@feathersjs/feathers';

import { FEATHERS } from '../../tokens/feathers.token';

import { DataServiceFactory } from './data-service-factory.class';
import { DataService } from './data-service.class';
import { FeathersDataService } from './feathers-data-service.class';

@Injectable()
export class FeathersDataServiceFactory extends DataServiceFactory {

    constructor(@Inject(FEATHERS) private readonly _app: Application) {
        super();
    }

    create<T>(path: string): DataService<T> {
        return new FeathersDataService(this._app, path);
    }

}
