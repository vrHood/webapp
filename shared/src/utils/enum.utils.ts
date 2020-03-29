import { without as _without } from 'lodash';

export namespace EnumUtils {

    export function getKeys<ENUM>(enumLike: ENUM): (keyof ENUM)[] {
        return (Object.keys(enumLike)).filter((value) => {
            // @ts-ignore hack for number values in enums
            const reverseMapped = enumLike[enumLike[value]];

            return reverseMapped == null || 'string' === typeof reverseMapped;
        }) as (keyof ENUM)[];
    }

    export function getValues<ENUM>(enumLike: ENUM): ENUM[keyof ENUM][] {
        return _without(Object.keys(enumLike).map((key) => enumLike[key as keyof ENUM]), ...getKeys(enumLike) as any[]) as ENUM[keyof ENUM][];
    }
}
