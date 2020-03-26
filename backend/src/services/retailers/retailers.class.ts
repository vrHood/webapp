import { IRetailer } from '@vrhood/shared';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';

import { Application } from '../../declarations';

export class Retailers extends Service<IRetailer> {

    constructor(options: Partial<MongooseServiceOptions>, app: Application) {
        super(options);
    }

}
