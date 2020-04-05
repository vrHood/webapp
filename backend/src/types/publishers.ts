import { Publisher } from '@feathersjs/transport-commons/lib/channels/mixins';

import { EventName } from './event-name.model';

export type Publishers<T = any, CUSTOM_EVENT extends string = never> = Publisher<T> | Record<CUSTOM_EVENT | EventName, Publisher<T>>;