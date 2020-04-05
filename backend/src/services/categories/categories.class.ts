import { ICategory } from '@vrhood/shared';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';

import { Application } from '../../declarations';

export class Categories extends Service<ICategory> {

    constructor(options: Partial<MongooseServiceOptions>, app: Application) {
        super(options);
    }

}
