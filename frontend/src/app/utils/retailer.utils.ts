import { IRetailer } from '@vrhood/shared';
import { includes as _includes, some as _some } from 'lodash'

export namespace RetailerUtils {

    export function hasAnyCategory(retailer: IRetailer, categoryIds: string[]): boolean {
        console.log('RetailerUtils hasAnyCategory', retailer, categoryIds);
        if (!retailer || !categoryIds || !categoryIds.length) {
            console.log('RetailerUtils hasAnyCategory => false');
            return false;
        }

        const result = _includes(categoryIds, retailer.mainCategoryId) || (retailer.additionalCategoryIds != null && _some(retailer.additionalCategoryIds, (id) => _includes(categoryIds, id)))
        console.log('RetailerUtils hasAnyCategory => ', result);
        return result;
    }
}
