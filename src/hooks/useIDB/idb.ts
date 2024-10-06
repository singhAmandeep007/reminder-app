import { waitUntil } from "utils";

import { IDB_KEY } from "./consts";

import { TIDBConfig, TCustomWindow } from "./types";

declare let window: TCustomWindow;

function validateStore(db: IDBDatabase, storeName: string) {
  return db.objectStoreNames.contains(storeName);
}

export function validateBeforeTransaction(db: IDBDatabase, storeName: string, reject: Function) {
  if (!db) {
    reject(new Error("Queried before opening connection"));
  }
  if (!validateStore(db, storeName)) {
    reject(new Error(`Store ${storeName} in ${db.name} not found`));
  }
}

export function createTransaction(
  db: IDBDatabase,
  dbMode: IDBTransactionMode,
  currentStore: string,
  resolve?: (value?: any) => void,
  reject?: (value?: any) => void,
  abort?: IDBTransaction["onabort"]
): IDBTransaction {
  const tx: IDBTransaction = db.transaction(currentStore, dbMode);

  if (reject) tx.onerror = reject;
  if (resolve) tx.oncomplete = resolve;
  if (abort) tx.onabort = abort;

  return tx;
}

export async function getConnection(config?: TIDBConfig): Promise<IDBDatabase> {
  const idbInstance = typeof window !== "undefined" ? window.indexedDB : null;
  let _config = config;

  if (!config && idbInstance) {
    await waitUntil(() => window?.[IDB_KEY]?.["init"] === 1);
    _config = window[IDB_KEY]?.["config"];
  }

  return new Promise<IDBDatabase>((resolve, reject) => {
    if (idbInstance && _config) {
      const request: IDBOpenDBRequest = idbInstance.open(_config.databaseName, _config.version);

      request.onsuccess = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      request.onerror = (e) => {
        reject((e.target as IDBOpenDBRequest).error);
      };

      request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
        const db = (e.target as IDBOpenDBRequest).result;
        const transaction = (e.target as IDBOpenDBRequest).transaction;

        if (_config && _config.stores) {
          _config.stores.forEach((s) => {
            if (!db.objectStoreNames.contains(s.name)) {
              const store = db.createObjectStore(s.name, s.id);
              s.indices.forEach((c) => {
                store.createIndex(c.name, c.keyPath, c.options);
              });
            } else {
              const store = transaction?.objectStore(s.name);
              if (store) {
                s.indices.forEach((c) => {
                  if (!store.indexNames.contains(c.name)) {
                    store.createIndex(c.name, c.keyPath, c.options);
                  }
                });
              }
            }
          });
        }

        // onsuccess event will be triggered after the upgrade is complete
      };
    } else {
      reject(new Error("Failed to connect to IndexedDB"));
    }
  });
}

export function getActions<T>(currentStore: string) {
  return {
    getByID(id: string | number) {
      return new Promise<T>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readonly", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const request = objectStore.get(id);

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },

    getOneByKey(keyPath: string, value: string | number) {
      return new Promise<T | undefined>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readonly", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const index = objectStore.index(keyPath);
            const request = index.get(value);

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },

    getManyByKey(keyPath: string, value: string | number) {
      return new Promise<T[]>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readonly", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const index = objectStore.index(keyPath);
            const request = index.getAll(value);

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },

    getAll() {
      return new Promise<T[]>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readonly", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const request = objectStore.getAll();

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },

    add(value: T, key?: any) {
      return new Promise<Event>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readwrite", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const request = objectStore.add(value, key);

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },

    update(value: T, key?: any) {
      return new Promise<any>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readwrite", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const request = objectStore.put(value, key);

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },

    deleteByID(id: any) {
      return new Promise<any>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readwrite", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const request = objectStore.delete(id);

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },

    deleteAll() {
      return new Promise<any>((resolve, reject) => {
        getConnection()
          .then((db) => {
            validateBeforeTransaction(db, currentStore, reject);
            const tx = createTransaction(db, "readwrite", currentStore, resolve, reject);
            const objectStore = tx.objectStore(currentStore);
            const request = objectStore.clear();

            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
            request.onerror = () => reject(request.error);
          })
          .catch(reject);
      });
    },
  };
}
