import { DataService } from './data-service.class';

export abstract class DataServiceFactory {

    abstract create<T>(path: string): DataService<T>;

}
