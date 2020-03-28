import { Application as ExpressFeathers } from '@feathersjs/express';
import * as mongoose from 'mongoose';

export enum ModelName {
    CATEGORY = 'category',
    RETAILER = 'retailer',
    USER = 'user'
}

// A mapping of service names to types. Will be extended in service files.
// tslint:disable-next-line:no-empty-interface
export interface ServiceTypes {

}

// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes> & {
    get(name: 'mongooseClient'): typeof mongoose;
};
