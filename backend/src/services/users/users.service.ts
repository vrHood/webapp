// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { IUser, ServiceName } from '@vrhood/shared';

import { Application } from '../../declarations';
import createModel from '../../models/user.model';

import { Users } from './users.class';
import hooks from './users.hooks';

// Add this service to the service type index
declare module '../../declarations' {

    interface ServiceTypes {
        [ServiceName.USERS]: Users & ServiceAddons<IUser>;
    }
}

export default function (app: Application) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use(`/${ServiceName.USERS}`, new Users(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service(ServiceName.USERS);

    service.hooks(hooks);
}
