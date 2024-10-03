import { useMemo } from "react";

import { IDB_KEY } from "./consts";

import { getActions, getConnection } from "./idb";

import { TIDBConfig, TCustomWindow } from "./types";

declare let window: TCustomWindow;

export async function setupIndexedDB(config: TIDBConfig) {
  return new Promise<IDBDatabase>(async (resolve, reject) => {
    try {
      const db = await getConnection(config);

      window[IDB_KEY] = { init: 1, config };
      resolve(db);
    } catch (e) {
      reject(e);
    }
  });
}

export function useIndexedDBStore<T>(storeName: string) {
  const _actions = useMemo(() => getActions<T>(storeName), [storeName]);
  return _actions;
}
