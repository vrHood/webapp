import { Publisher } from '@feathersjs/transport-commons/lib/channels/mixins';
import { IUser, UserRole, UserUtils } from '@vrhood/shared';
import { get as _get } from 'lodash';

import { Application, HookContext } from '../../declarations';
import { ChannelUtils, StaticChannel } from '../../utils/channel.utils';
import { DataUtils } from '../../utils/data.utils';

const transformData = DataUtils.omitFactory('active');

export function usersChannels(app: Application): Publisher<IUser> {
    return (user: IUser, context: HookContext<IUser>) => {
        const channels = [ app.channel(StaticChannel.ROLE_ADMIN) ];

        const activeUser = _get(context, 'params.user') || _get(context, 'params.connection.user');

        if (activeUser) {
            channels.push(ChannelUtils.getUserChannel(app, activeUser).send(transformData(user)));
        }

        if (user) {
            channels.push(ChannelUtils.getUserChannel(app, user).send(transformData(user)));

            if (UserUtils.hasRole(user, UserRole.RETAILER) && user.retailerId) {
                channels.push(ChannelUtils.getRetailerChannel(app, user.retailerId).send(transformData(user)));
            }
        }

        return channels;
    };
}
