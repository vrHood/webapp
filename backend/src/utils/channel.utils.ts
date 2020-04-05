import { ServiceAddons } from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import { Channel, RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base';
import { Publisher } from '@feathersjs/transport-commons/lib/channels/mixins';
import { IUser, UserRole, UserUtils } from '@vrhood/shared';
import { forEach as _forEach, get as _get, isFunction as _isFunction } from 'lodash';
import { Types } from 'mongoose';

import { Application } from '../declarations';
import { EventName } from '../types/event-name.model';
import { PublishersFactory } from '../types/publishers-factory';

import { DataUtils } from './data.utils';
import { PermissionUtils } from './permission.utils';
import { TypeUtils } from './type.utils';

declare module '@feathersjs/transport-commons/lib/channels/channel/base' {
    interface RealTimeConnection {
        user: IUser;
    }

    type RealTimeConnectionOrFilterFn = RealTimeConnection | ((connection: RealTimeConnection) => boolean);

    interface Channel {
        leave(...connections: RealTimeConnectionOrFilterFn[]): this;
    }
}

export enum StaticChannel {
    AUTHENTICATED = 'authenticated',
    ANONYMOUS = 'anonymous',
    ROLE_ADMIN = 'role/admin',
    ROLE_RETAILER = 'role/retailer'
}

export namespace ChannelUtils {

    export function getRoleChannel(app: Application, user: IUser) {
        return user ? app.channel(`role/${user.role}`) : null;
    }

    export function getUserChannel(app: Application, user: IUser) {
        return user ? app.channel(`user/${TypeUtils.objectIdToString(user._id)}`) : null;
    }

    export function getRetailerChannel(app: Application, retailerId: string | Types.ObjectId) {
        return app.channel(`retailer/${TypeUtils.objectIdToString(retailerId)}`);
    }

    export function getChannels(app: Application, user: IUser): Channel[] {
        if (!user) {
            return [ app.channel(StaticChannel.ANONYMOUS) ];
        }

        const channels: any[] = [];

        channels.push(
            app.channel(StaticChannel.AUTHENTICATED),
            getRoleChannel(app, user),
            getUserChannel(app, user)
        );

        if (UserUtils.hasRole(user, UserRole.RETAILER) && user.retailerId) {
            channels.push(getRetailerChannel(app, user.retailerId));
        }

        return channels.filter(channel => channel != null);
    }

    export function joinChannels(app: Application, connection: RealTimeConnection) {
        if (!connection) {
            return;
        }

        const channels = getChannels(app, connection.user);

        for (const channel of channels) {
            channel.join(connection);
        }
    }

    export function leaveChannels(app: Application, user: IUser) {
        if (!user) {
            return;
        }

        app.channel(app.channels).leave((connection) => {
            if (TypeUtils.objectIdEquals(_get(connection, 'user._id'), user._id)) {
                PermissionUtils.removeAbility(connection);
                return true;
            }

            return false;
        });
    }

    export function updateChannels(app: Application, user: IUser) {
        if (!app.channels || !app.channels.length || !user) {
            return;
        }

        const { connections } = app.channel(app.channels).filter(connection =>
            TypeUtils.objectIdEquals(_get(connection, 'user._id'), user._id)
        );

        leaveChannels(app, user);

        connections.forEach(connection => {
            connection.user = user;
            PermissionUtils.updateAbility(app, connection);
            joinChannels(app, connection);
        });
    }

    export function configureChannels<T, CUSTOM_EVENT extends string = never>(app: Application,
                                                                              service: ServiceAddons<T>,
                                                                              publishersFactory: PublishersFactory<T, CUSTOM_EVENT>) {
        if (!publishersFactory) {
            return;
        }

        const publishers = publishersFactory(app, service);

        if (_isFunction(publishers)) {
            service.publish(publishers);
        }

        if (publishers) {
            _forEach(publishers, (publisher: Publisher<T>, eventName: EventName | CUSTOM_EVENT) => {
                service.publish(eventName, publisher);
            });
        }
    }
}
