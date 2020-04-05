import { Publisher } from '@feathersjs/transport-commons/lib/channels/mixins';
import { ICategory } from '@vrhood/shared';
import { get as _get } from 'lodash';

import { Application, HookContext } from '../../declarations';
import { ChannelUtils, StaticChannel } from '../../utils/channel.utils';
import { DataUtils } from '../../utils/data.utils';

const transformData = DataUtils.omitFactory('active');

export function categoriesChannels(app: Application): Publisher<ICategory> {
    return (category: ICategory, context: HookContext<ICategory>) => {
        const channels = [ app.channel(StaticChannel.ROLE_ADMIN) ];

        const activeUser = _get(context, 'params.user') || _get(context, 'params.connection.user');

        if (activeUser) {
            channels.push(ChannelUtils.getUserChannel(app, activeUser).send(transformData(category)));
        }

        if (category) {
            channels.push(ChannelUtils.getRetailerChannel(app, category._id).send(transformData(category)));
        }

        return channels;
    };
}
