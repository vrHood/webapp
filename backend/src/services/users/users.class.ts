import { MongoDBServiceOptions, Service } from 'feathers-mongodb';
import { Db } from 'mongodb';

import { Application } from '../../declarations';

export class Users extends Service {
    constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
        super(options);

        const client: Promise<Db> = app.get('mongoClient');

        client.then(db => {
            this.Model = db.collection('users');
        });
    }
}
