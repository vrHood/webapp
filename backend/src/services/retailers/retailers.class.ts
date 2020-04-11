import { IPopulatedRetailer, IRetailer } from '@vrhood/shared';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';

import { Application } from '../../declarations';

export class Retailers extends Service<IRetailer> {

    readonly joinFields: (keyof IPopulatedRetailer)[] = [ 'mainCategory', 'additionalCategories' ];

    constructor(options: Partial<MongooseServiceOptions>, app: Application) {
        super(options);
    }

    get fields(): string[] {
        return Object.keys(this.Model.schema.paths).concat(...this.joinFields);
    }

}
