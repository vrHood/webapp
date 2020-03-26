import { IUser } from '@vrhood/shared';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';

import { Application } from '../../declarations';

export class Users extends Service<IUser> {

    constructor(options: Partial<MongooseServiceOptions>, app: Application) {
        super(options);
    }

}
