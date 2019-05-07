import {
    forEach,
    addIndex,
    map,
    is,
    reduce
} from 'ramda';

const
    noop = () => {},
    isFunction = is(Function),
    isString = is(String),
    isArray = is(Array),
    isObject = is(Object),
    forEachIndex = addIndex(forEach),
    mapIndex = addIndex(map),
    keyBy = (getProp, list) => {
        const
            reducer = (assocList, element) => {
                const prop = isFunction(getProp) ? getProp(element) : getProp;

                assocList[element[prop]] = element;

                return assocList;
            };

        return list ? reduce(reducer, {}, list) : reduce(reducer, {});
    },
    startsWith = (needle, haystack, position = 0) => (
        isFunction(haystack.startsWith) ?
            haystack.startsWith(needle, position) :
            haystack.lastIndexOf(needle, position) === position
    );

export {
    noop,
    isFunction,
    isString,
    isArray,
    isObject,
    forEachIndex,  // array only
    mapIndex, // array only
    keyBy,
    startsWith
};
