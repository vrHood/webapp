import { ServiceAddons } from '@feathersjs/feathers';

import { Application } from '../declarations';

import { Publishers } from './publishers';

export type PublishersFactory<T, CUSTOM_EVENT extends string = never> =
    (app: Application, service?: ServiceAddons<T>) => Publishers<T, CUSTOM_EVENT>;
