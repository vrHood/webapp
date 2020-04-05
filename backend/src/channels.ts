import { HookContext } from '@feathersjs/feathers';
import '@feathersjs/transport-commons';

import { Application } from './declarations';
import { ChannelUtils, StaticChannel } from './utils/channel.utils';

export default function (app: Application) {

    if (typeof app.channel !== 'function') {
        // If no real-time functionality has been configured just return
        return;
    }

    app.on('connection', (connection: any) => {
        if (connection) {
            app.channel(StaticChannel.ANONYMOUS).join(connection);
        }
    });

    app.on('login', (authResult: any, { connection }: any) => {
        if (connection) {
            app.channel(StaticChannel.ANONYMOUS).leave(connection);
            ChannelUtils.joinChannels(app, connection);
        }
    });

    // eslint-disable-next-line no-unused-vars
    app.publish((data: any, hook: HookContext) => {
        // Here you can add event publishers to channels set up in `channels.js`
        // To publish only for a specific event use `app.publish(eventname, () => {})`

        console.warn('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

        // e.g. to publish all service events to all authenticated users use
        return app.channel(StaticChannel.ROLE_ADMIN);
    });
}
