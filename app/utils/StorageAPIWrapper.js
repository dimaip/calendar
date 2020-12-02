import { Plugins } from '@capacitor/core';
import 'capacitor-data-storage-sqlite';

const { CapacitorDataStorageSqlite } = Plugins;

const StorageAPIWrapper = storage => {
    return {
        openStore: (options, cb) => {
            storage
                .openStore(options)
                .then(({ result }) => cb(result))
                .catch(cb);
        },
        setTable: (table, cb) => {
            storage
                .setTable(table)
                .then(({ result, message }) => cb(result, message))
                .catch(cb);
        },
        getAllKeys: cb => {
            storage
                .keys()
                .then(({ keys }) => cb(keys))
                .catch(cb);
        },
        getAllValues: cb => {
            storage
                .values()
                .then(({ values }) => cb(values))
                .catch(cb);
        },
        getFilterValues: (filter, cb) => {
            storage
                .filtervalues(filter)
                .then(({ values }) => cb(values))
                .catch(cb);
        },
        getAllKeysValues: cb => {
            storage
                .keysvalues()
                .then(({ keysvalues }) => cb(keysvalues))
                .catch(cb);
        },
        getItem: (key, cb) => {
            storage
                .get({ key })
                .then(({ value }) => cb(value))
                .catch(cb);
        },
        setItem: (key, value, cb) => {
            storage
                .set({ key, value })
                .then(({ result }) => cb(result))
                .catch(cb);
        },
        isKey: (key, cb) => {
            storage
                .iskey({ key })
                .then(({ result }) => cb(result))
                .catch(cb);
        },
        removeItem: (key, cb) => {
            storage
                .remove({ key })
                .then(({ result }) => cb(result))
                .catch(cb);
        },
        clear: cb => {
            storage
                .clear()
                .then(({ result }) => cb(result))
                .catch(cb);
        },
        deleteStore: (options, cb) => {
            storage
                .deleteStore(options)
                .then(({ result }) => cb(result))
                .catch(cb);
        },
    };
};

const wrapper = new StorageAPIWrapper(CapacitorDataStorageSqlite);

export default () => {
    return wrapper;
};
