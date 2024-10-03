import { IDB_KEY } from "./consts";

export type TIDBColumn = {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
};

export type TIDBStore = {
  name: string;
  id: IDBObjectStoreParameters;
  indices: TIDBColumn[];
};

export type TIDBConfig = {
  databaseName: string;
  version: number;
  stores: TIDBStore[];
};

export type TCustomWindow = Window & {
  [IDB_KEY]: any;
};
