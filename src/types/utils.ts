export type TNonEmptyArray<T> = T[] & { 0: T };

export type TOnly<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type TEither<T, U> = TOnly<T, U> | TOnly<U, T>;
