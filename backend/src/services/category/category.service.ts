import { ServiceAddons } from '@feathersjs/feathers';
import { ICategory, ServiceName } from '@vrhood/shared';

import { Application } from '../../declarations';
import createModel from '../../models/category.model';

import { Category } from './category.class';
import hooks from './category.hooks';

// Add this service to the service type index
declare module '../../declarations' {

    interface ServiceTypes {
        [ServiceName.CATEGORIES]: Category & ServiceAddons<ICategory>;
    }
}

export default function (app: Application) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use(`/${ServiceName.CATEGORIES}`, new Category(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service(ServiceName.CATEGORIES);

    service.hooks(hooks);
}
