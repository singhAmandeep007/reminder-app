export function merge<T extends object, U extends object[]>(target: T, ...sources: U): T & U[number] {
  const isObject = (item: unknown): item is object => item !== null && typeof item === "object" && !Array.isArray(item);

  for (const source of sources) {
    for (const key of Object.keys(source)) {
      // @ts-expect-error
      const targetValue = target[key];
      // @ts-expect-error
      const sourceValue = source[key];

      if (isObject(targetValue) && isObject(sourceValue)) {
        // Recursive merge for nested objects
        // @ts-expect-error
        target[key] = merge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        // Overwrite primitives and undefined values from target
        // @ts-expect-error
        target[key] = sourceValue;
      }
    }
  }

  return target as T & U[number];
}

const generateUUID = function () {
  let counter = 0;
  return function () {
    counter += 1;
    return (
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }) + `-${counter.toString()}`
    );
  };
};

export const uuid = generateUUID();
