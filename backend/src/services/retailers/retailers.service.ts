import { ServiceAddons } from '@feathersjs/feathers';
import { IRetailer, ServiceName } from '@vrhood/shared';

import { Application } from '../../declarations';
import createModel from '../../models/retailer.model';

import { Retailers } from './retailers.class';
import hooks from './retailers.hooks';

// Add this service to the service type index
declare module '../../declarations' {

    interface ServiceTypes {
        [ServiceName.RETAILERS]: Retailers & ServiceAddons<IRetailer>;
    }
}

export default function (app: Application) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use(`/${ServiceName.RETAILERS}`, new Retailers(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service(ServiceName.RETAILERS);

    service.hooks(hooks);
}
