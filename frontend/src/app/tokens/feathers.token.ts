import { InjectionToken } from '@angular/core';
import authentication from '@feathersjs/authentication-client';
import feathers, { Application } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

import { environment } from '../../environments/environment';

export const FEATHERS = new InjectionToken<Application>('app.feathers', {
    factory: () => {
        const socket = io(environment.endpoint, {
            transports: [ 'websocket' ],
            forceNew: true
        });

        const app = feathers();

        app.configure(socketio(socket));
        app.configure(authentication({
            storageKey: 'auth'
        }));

        return app;
    }
});
