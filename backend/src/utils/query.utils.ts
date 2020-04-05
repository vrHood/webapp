import { omit as _omit, pick as _pick, size as _size } from 'lodash';

export namespace QueryUtils {

    export enum SystemOpertors {
        LIMIT = '$limit',
        SELECT = '$select',
        SKIP = '$skip',
        SORT = '$sort',
        CLIENT = '$client'
    }

    export enum CustomOperators {
        AGGREGATE = '$aggregate',
        DISABLE_PAGINATION = '$disablePagination'
    }

    const TOP_LEVEL_OPERATORS = [
        SystemOpertors.CLIENT,
        SystemOpertors.LIMIT,
        SystemOpertors.SELECT,
        SystemOpertors.SKIP,
        SystemOpertors.SORT,
        CustomOperators.AGGREGATE,
        CustomOperators.DISABLE_PAGINATION
    ];

    /**
     * Merges a list of queries into one
     * @param queries
     */
    export function mergeQueries(...queries: any) {
        if (!queries) {
            return {};
        }

        queries = queries.filter((query) => query != null);

        if (queries.length === 0) {
            return {};
        } else if (queries.length === 1) {
            return queries[0];
        }

        const result = queries.reduce((result, query) => {
            if (query == null) {
                return result;
            }

            result.specialParams = { ..._pick(query, TOP_LEVEL_OPERATORS), ...result.specialParams };
            query = _omit(query, TOP_LEVEL_OPERATORS);

            if (_size(query) > 0) {
                result.queries.push(query);
            }

            return result;
        }, {
            queries: [],
            specialParams: {}
        });

        if (!result.queries.length) {
            return { ...result.specialParams };
        } else if (result.queries.length === 1) {
            return { ...result.specialParams, ...result.queries[0] };
        }

        return {
            ...result.specialParams,
            $and: result.queries
        };
    }

}
