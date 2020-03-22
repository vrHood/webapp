import { Paginated } from '@feathersjs/feathers';
import { Application } from './declarations';
import logger from './logger';

export default async function (app: Application) {

    logger.info('initUsers: start');

    const usersService = app.service('users');

    const users = await usersService.find({
        query: {
            $limit: 0
        }
    }) as Paginated<any>;

    const initialUsers = app.get('initialUsers');

    if (users.total === 0 && Array.isArray(initialUsers) && initialUsers.length > 0) {
        for (const user of initialUsers) {
            try {
                const createdUser = await usersService.create(user);
                logger.info('Initial user created:', createdUser);
            } catch (e) {
                logger.error('Initial user error:', e);
            }
        }
    }

    logger.info('initUsers: done');

}
