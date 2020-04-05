import { Publisher } from '@feathersjs/transport-commons/lib/channels/mixins';
import { IRetailer } from '@vrhood/shared';
import { get as _get } from 'lodash';

import { Application, HookContext } from '../../declarations';
import { ChannelUtils, StaticChannel } from '../../utils/channel.utils';
import { DataUtils } from '../../utils/data.utils';

const transformData = DataUtils.omitFactory('active');

export function retailersChannels(app: Application): Publisher<IRetailer> {
    return (retailer: IRetailer, context: HookContext<IRetailer>) => {
        const channels = [ app.channel(StaticChannel.ROLE_ADMIN) ];

        const activeUser = _get(context, 'params.user') || _get(context, 'params.connection.user');

        if (activeUser) {
            channels.push(ChannelUtils.getUserChannel(app, activeUser).send(transformData(retailer)));
        }

        if (retailer) {
            channels.push(ChannelUtils.getRetailerChannel(app, retailer._id).send(transformData(retailer)));
        }

        return channels;
    };
}
