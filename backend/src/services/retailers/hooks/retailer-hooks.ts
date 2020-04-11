import { Query } from '@feathersjs/feathers';
import { ICategory, IPopulatedRetailer, ServiceName } from '@vrhood/shared';
import { fastJoin as feathersFastJoin, ResolverContext, SyncContextFunction } from 'feathers-hooks-common';

import { FastJoinUtils } from '../../../utils/fast-join.utils';

export namespace RetailerHooks {

    export function fastJoin(query?: Query | SyncContextFunction<Query>) {
        return feathersFastJoin(
            {
                before: (context: ResolverContext) => {
                    context._loaders = FastJoinUtils.createLoader<ICategory>(context, ServiceName.CATEGORIES);
                },
                joins: {
                    mainCategory: () => async (retailer: IPopulatedRetailer, context) => {
                        if (retailer.mainCategoryId) {
                            return retailer.mainCategory = await context._loaders.load(retailer.mainCategoryId);
                        }

                        return retailer.mainCategory;
                    },
                    additionalCategories: () => async (retailer: IPopulatedRetailer, context) => {
                        if (retailer.additionalCategoryIds != null) {
                            if (retailer.additionalCategoryIds.length === 0) {
                                return retailer.additionalCategories = [];
                            }

                            retailer.additionalCategories = await context._loaders.loadMany(retailer.additionalCategoryIds);
                            return retailer.additionalCategories;
                        }

                        return retailer.additionalCategories;
                    }
                }
            },
            query
        );
    }

}
