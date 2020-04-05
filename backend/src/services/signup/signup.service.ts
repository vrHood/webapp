// Initializes the `signup` service on path `/signup`
import { ServiceAddons } from '@feathersjs/feathers';
import { ServiceName, SignupData, SignupType } from '@vrhood/shared';

import { Application } from '../../declarations';

import { Signup, SignupOptions } from './signup.class';
import hooks from './signup.hooks';

// Add this service to the service type index
declare module '../../declarations' {

    interface ServiceTypes {
        [ServiceName.SIGNUP]: Signup & ServiceAddons<SignupData>;
    }
}

export default function (app: Application) {
    const options: SignupOptions = {
        enabledTypes: [ SignupType.RETAILER ]
    };

    // Initialize our service with any options it requires
    app.use(`/${ServiceName.SIGNUP}`, new Signup(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service(ServiceName.SIGNUP);

    service.hooks(hooks);
}
